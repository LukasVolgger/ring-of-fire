import { Component, OnInit } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';
import { Game } from 'src/models/game';
import { FirestoreService } from '../services/firestore.service';
import { collection, getDocs } from "firebase/firestore";

@Component({
  selector: 'app-start-screen',
  templateUrl: './start-screen.component.html',
  styleUrls: ['./start-screen.component.scss']
})
export class StartScreenComponent implements OnInit {
  timestampNow: number = Date.now();

  constructor(private firestore: AngularFirestore, private router: Router, private firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.deleteOldGames(86400000);
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


  /**
   * Deletes old games
   * 1 month = 2629743833.3
   * 1 week = 604800000
   * 1 day (d) = 86400000
   * 1 hours (h) = 3600000
   * @param time time in milliseconds
   */
  deleteOldGames(time: number) {
    this.firestore
      .collection('games')
      .valueChanges()
      .subscribe((game) => {
        game.forEach((element) => {
          if ((this.timestampNow - element['timestamp']) > time) {
            this.firestoreService.deleteFromFirestore(element['documentID']);
          };
        })
      });
  }


}
