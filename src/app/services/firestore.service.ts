import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class FirestoreService {

  constructor(private firestore: AngularFirestore) { }

  /**
 * CRUD => CREATE
 * Adds data to the Firestore
 * @param collection The collection of the Firestore
 * @param element The element in the collection
 */
  public addToFirestore(collection: string, element: object) {
    this.firestore.collection(collection).add({ 'game': element });
  }

}
