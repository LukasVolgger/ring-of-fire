import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  currentCard: string = '';
  drawCardAnimation = false;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog) {

  }

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((param) => {
      console.log('Game ID: ', param['gameID']);
      // let gameID = param['gameID']; TODO Reactivate!
      let gameID = 'SNFkvCsUN9szBtvng9iY'; // TODO Remove! Only for testing

      this.getDataFromFirestore(gameID);
    });
  }

  // ############################################################################################### GAME

  /**
   * Initializes a new game by creating an object instance of Game()
   * Adds the game to the Firestore
   */
  newGame() {
    this.game = new Game();
    // console.log('Game Object: ', this.game);
    // console.log('Game JSON: ', this.game.toJSON());

    // this.addToFirestore('games', this.game.toJSON());
  }

  /**
   * Draws a card unless the animation is currently playing
   * Increments the index this.game.currentPlayer++; so that on the next draw it is the next player's turn
   */
  drawCard() {
    if (!this.drawCardAnimation) { // Only draw a card when animation is not running
      this.drawCardAnimation = true;
      this.currentCard = this.game.stack.pop(); // With pop() the last card from the stack is assigned to the variable currentCard

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // e.g. 0%3 = 0; 1%3 = 1; 2%3 = 2; ...
      console.log('Current card: ', this.currentCard);

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.drawCardAnimation = false;
      }, 1200) // Must be the same time as SCSS: draw-card-animation
    }
  }

  /**
   * Opens the dialog component DialogAddPlayerComponent
   */
  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, {});

    dialogRef.afterClosed().subscribe(playerName => { // Gets the name of the input from dialog-add-player
      if (playerName && playerName.length > 0) {
        this.game.players.push(playerName);
      }
    });
  }

  // ############################################################################################### FIRESTORE

  /**
   * Fetches the data from the Firestore
   */
  getDataFromFirestore(gameID) {
    this.firestore
      .collection('games')
      .doc(gameID)
      .valueChanges()
      .subscribe((game) => {
        console.log('Firestore update: ', game);
        this.updateLocalData(game);
      })
  }

  /**
   * Adds data to the Firestore
   * @param collection The collection of the Firestore
   * @param element The element in the collection
   */
  addToFirestore(collection: string, element: object) {
    this.firestore.collection(collection).add({ 'game': element });
  }

  /**
   * Updates the local variables
   * @param game The game object from Firestore
   */
  updateLocalData(game) {
    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.players = game.players;
    this.game.stack = game.stack;

    console.warn(game.players);
    console.log('Local update', this.game);
  }
}