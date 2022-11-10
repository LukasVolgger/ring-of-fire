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

  constructor(private firestore: AngularFirestore, private router: Router, public firestoreService: FirestoreService) { }

  ngOnInit(): void {
    this.deleteOldGames(86400000);
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
