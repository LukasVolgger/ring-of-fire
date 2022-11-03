import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { ActivatedRoute } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameID: string;

  constructor(private route: ActivatedRoute, private firestore: AngularFirestore, public dialog: MatDialog, private firestoreService: FirestoreService) {

  }

  ngOnInit(): void {
    this.newGame();

    this.route.params.subscribe((param) => {
      console.log('Game ID: ', param['gameID']);
      this.gameID = param['gameID'];

      this.getDataFromFirestore(this.gameID);
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
  }

  /**
   * Draws a card unless the animation is currently playing
   * Increments the index this.game.currentPlayer++; so that on the next draw it is the next player's turn
   */
  drawCard() {
    if (!this.game.drawCardAnimation) { // Only draw a card when animation is not running
      this.game.drawCardAnimation = true;
      this.game.currentCard = this.game.stack.pop(); // With pop() the last card from the stack is assigned to the variable currentCard

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // e.g. 0%3 = 0; 1%3 = 1; 2%3 = 2; ...
      console.log('Current card: ', this.game.currentCard);

      this.updateFirestore(); // Here must also be updated because otherwise the draw card animation is not synchronized 

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.drawCardAnimation = false;

        this.updateFirestore();
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
        this.addPlayer(playerName);
      }
    });
  }

  /**
   * Adds a new player to the current game instance
   * @param playerName The name of the player
   */
  addPlayer(playerName) {
    this.game.players.push(playerName);
    this.updateFirestore();
  }

  /**
 * Updates the local variables
 * @param game The game object from Firestore
 */
  updateLocalData(game: any) {
    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.players = game.players;
    this.game.stack = game.stack;
    this.game.currentCard = game.currentCard;
    this.game.drawCardAnimation = game.drawCardAnimation;

    console.log('Local update: ', this.game);
  }

  // ############################################################################################### FIRESTORE (CRUD)

  /**
   * CRUD => READ
   * Fetches the data from the Firestore
   */
  public getDataFromFirestore(gameID) {
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
   * CRUD => UPDATE
   * Updates the data in the Firestore
   */
  public updateFirestore() {
    this.firestore
      .collection('games')
      .doc(this.gameID)
      .update(this.game.toJSON());

    // console.log(this.game.toJSON());
  }

}