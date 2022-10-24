import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {

  constructor(private firestore: AngularFirestore, private router: Router) { }

  ngOnInit(): void {
  }

  /**
   * 1. Creates a new instance of the Game object
   * 2. Adds the new object to the Firestore
   * 3. With .then() the ID of the document in the Firestore is assigned to the variable gameID
   * 4. Navigates to a new game with the unique gameID as URL
   */
  startNewGame() {
    let game = new Game;
    this.firestore
      .collection('games')
      .add(game.toJSON())
      .then((gameInfo) => {
        let gameID = gameInfo.id;

        // console.log('Game ID: ', gameID);

        this.router.navigateByUrl('/game/' + gameID);
      })
  }

}
