import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FirestoreService } from '../services/firestore.service';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';
import { DialogGameSettingsComponent } from '../dialog-game-settings/dialog-game-settings.component';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  gameID: string;
  maxPlayerLimit: number = 4;
  gameOver: boolean = false;

  constructor(private route: ActivatedRoute, public dialog: MatDialog, private firestoreService: FirestoreService, private router: Router) {

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
    this.checkGameOver();

    if (!this.game.drawCardAnimation && this.game.players.length > 0 && !this.game.gameOver) { // Only draw a card when animation is not running
      this.game.drawCardAnimation = true;
      this.game.currentCard = this.game.stack.pop(); // With pop() the last card from the stack is assigned to the variable currentCard

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // e.g. 0%3 = 0; 1%3 = 1; 2%3 = 2; ...

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
   * Opens the dialog component DialogAddPlayerComponent
   */
  openGameSettingsDialog() {
    const dialogRef = this.dialog.open(DialogGameSettingsComponent, {});

    dialogRef.afterClosed().subscribe(change => { // Gets the name of the input from dialog-add-player
      if (change) {
        console.log(change);
        this.game.backgroundImage = change;
        this.firestoreService.updateFirestore(this.gameID);
      }
    });
  }

  /**
   * Opens the dialog-edit-player component as dialog
   * @param playerID The index of the current player
   */
  openEditPlayerDialog(playerID: number): void {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent);

    dialogRef.afterClosed().subscribe(change => {

      if (change) {
        switch (change) {
          case 'DELETE':
            this.game.players.splice(playerID, 1)
            this.game.playerImages.splice(playerID, 1)
            break;

          case 'bee.svg':
            this.game.playerImages[playerID] = change;
            break;

          case 'penguin.svg':
            this.game.playerImages[playerID] = change;
            break;

          case 'standard_avatar.svg':
            this.game.playerImages[playerID] = change;
            break;

          case 'woman_blue.svg':
            this.game.playerImages[playerID] = change;
            break;

          case 'woman_pink.svg':
            this.game.playerImages[playerID] = change;
            break;

          default:
            this.game.players[playerID] = change;
            break;
        }
      }

      console.log('Edit player: ', playerID, 'Received change: ', change);
      this.firestoreService.updateFirestore(this.gameID);

    });
  }

  /**
   * Adds a new player to the current game instance
   * @param playerName The name of the player
   */
  addPlayer(playerName) {
    this.game.players.push(playerName);
    this.game.playerImages.push('standard_avatar.svg');
    this.firestoreService.updateFirestore(this.gameID);

    if (this.game.players.length > this.maxPlayerLimit - 1) {
      this.game.maxPlayerLimitReached = true;
      console.log(this.game.players.length)
    } else {
      this.game.maxPlayerLimitReached = false;
    }

    this.firestoreService.updateFirestore(this.gameID);
  }

  /**
   * Opens the standard mail program on the PC
   */
  shareGameByEmail() {
    // TODO Add URL
    window.open(`mailto:?subject=Hey, I want to play Ring of Fire with you!&body=Join the game: https://${this.gameID}>`);
  }

  /**
   * Copies the game link to the clipboard
   */
  copyLinkToClipboard() {
    // TODO Add URL
    let copyText = `Hey, I want to play Ring of Fire with you! https://${this.gameID}`;

    navigator.clipboard.writeText(copyText);

    alert('Link copied to clipboard!');
  }

  /**
   * Checks if the last card has already been drawn
   * Shows game over screen if true
   */
  checkGameOver() {
    if (this.game.stack.length < 1) {
      this.game.gameOver = true;
      this.firestoreService.updateFirestore(this.gameID);
    }
  }

  /**
   * Redirects to start screen
   */
  startNewGame() {
    this.router.navigateByUrl('');
    this.firestoreService.deleteFromFirestore(this.gameID);
  }

}