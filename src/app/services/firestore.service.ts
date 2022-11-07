import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Game } from 'src/models/game';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  game: Game;

  constructor(private firestore: AngularFirestore) { }

  /**
   * CRUD => CREATE
   * Adds data to the Firestore
   * @param collection The collection of the Firestore
   * @param element The element in the collection
   */
  addToFirestore(collection: string, element: object) {
    this.firestore.collection(collection).add({ 'game': element });
  }

  /**
   * CRUD => READ
   * Fetches the data from the Firestore
   * @param gameID The document id from firestore
   */
  getDataFromFirestore(gameID) {
    this.firestore
      .collection('games')
      .doc(gameID)
      .valueChanges()
      .subscribe((game) => {
        // console.log('Firestore update: ', game);
        this.updateLocalData(game);
      })
  }

  /**
   * CRUD => UPDATE
   * Updates the firestore data
   * @param gameID The document id from firestore
   */
  updateFirestore(gameID) {
    this.firestore
      .collection('games')
      .doc(gameID)
      .update(this.game.toJSON());
  }

  /**
   * CRUD => DELETE
   * Deletes the passed document
   * @param gameID The document id from firestore
   */
  deleteFromFirestore(gameID) {
    this.firestore.collection('games').doc(gameID).delete();
  }

  /**
   * Updates the local variables
   * @param game The game object from Firestore
   */
  updateLocalData(game: any) {
    this.game.currentPlayer = game.currentPlayer;
    this.game.playedCards = game.playedCards;
    this.game.players = game.players;
    this.game.playerImages = game.playerImages;
    this.game.stack = game.stack;
    this.game.currentCard = game.currentCard;
    this.game.drawCardAnimation = game.drawCardAnimation;
    this.game.maxPlayerLimitReached = game.maxPlayerLimitReached;
    this.game.gameOver = game.gameOver;
    this.game.backgroundImage = game.backgroundImage;

    // console.log('Local update: ', this.game);
  }

}
