import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GameComponent } from './game/game.component';
import { StartScreenComponent } from './start-screen/start-screen.component';

const routes: Routes = [
  { path: "", component: StartScreenComponent },
  { path: "game/:gameID", component: GameComponent } // Access the game with the document ID from Firestore
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
