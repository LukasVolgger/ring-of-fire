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
    this.shareValues();

    this.route.params.subscribe((param) => {
      console.log('Game ID: ', param['gameID']);
      this.gameID = param['gameID'];

      this.firestoreService.getDataFromFirestore(this.gameID);
    });
  }

  /**
   * Initializes a new game by creating an object instance of Game()
   */
  newGame() {
    this.game = new Game();
  }

  /**
   * Passes values to other classes/services
   */
  shareValues() {
    this.firestoreService.game = this.game;
  }

  /**
   * Draws a card unless the animation is currently playing
   * Increments the index this.game.currentPlayer++; so that on the next draw it is the next player's turn
   */
  drawCard() {
    if (!this.game.drawCardAnimation && this.game.players.length > 0) { // Only draw a card when animation is not running
      this.game.drawCardAnimation = true;
      this.game.currentCard = this.game.stack.pop(); // With pop() the last card from the stack is assigned to the variable currentCard

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // e.g. 0%3 = 0; 1%3 = 1; 2%3 = 2; ...
      console.log('Current card: ', this.game.currentCard);

      this.firestoreService.updateFirestore(this.gameID); // Here must also be updated because otherwise the draw card animation is not synchronized 

      setTimeout(() => {
        this.game.playedCards.push(this.game.currentCard);
        this.game.drawCardAnimation = false;

        this.firestoreService.updateFirestore(this.gameID);
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
    this.firestoreService.updateFirestore(this.gameID);
  }

}