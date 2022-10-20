import { Component, OnInit } from '@angular/core';
import { Game } from 'src/models/game';
import { MatDialog } from '@angular/material/dialog';
import { DialogAddPlayerComponent } from '../dialog-add-player/dialog-add-player.component';
import { ɵallowPreviousPlayerStylesMerge } from '@angular/animations/browser';
import { collection, collectionData, Firestore } from '@angular/fire/firestore';
import { Observable } from 'rxjs';
@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.scss']
})
export class GameComponent implements OnInit {
  game: Game;
  currentCard: string = '';
  drawCardAnimation = false;

  item$: Observable<any>;

  constructor(private firestore: Firestore, public dialog: MatDialog) {
    const coll = collection(firestore, 'games');
    this.item$ = collectionData(coll);

    this.item$.subscribe((games) => {
      console.log('Updated games: ', games);
    })
  }

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

      this.game.currentPlayer++;
      this.game.currentPlayer = this.game.currentPlayer % this.game.players.length; // e.g. 0%3 = 0; 1%3 = 1; 2%3 = 2; ...
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
      if (playerName && playerName.length > 0) {
        this.game.players.push(playerName);
      }
    });
  }
}