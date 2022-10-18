import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  currentCard: string = '';
  drawCardAnimation = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
    this.newGame();
  }

  newGame() {
    this.game = new Game();
    console.log(this.game);
  }

  drawCard() {
    if (!this.drawCardAnimation) { // Only draw a card when animation is not running
      this.drawCardAnimation = true;
      this.currentCard = this.game.stack.pop(); // With pop() the last card from the stack is assigned to the variable currentCard

      console.log('Current card: ', this.currentCard);

      setTimeout(() => {
        this.game.playedCards.push(this.currentCard);
        this.drawCardAnimation = false;
      }, 1200)
    }
  }

  openDialog(): void {
    const dialogRef = this.dialog.open(DialogAddPlayerComponent, { // Reference to component

    });

    dialogRef.afterClosed().subscribe(playerName => { // Gets the name of the input from dialog-add-player
      this.game.players.push(playerName);
    });
  }
}