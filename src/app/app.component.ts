import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'ring-of-fire';
}

// ########################################################################################### DEVELOPMENT PAUSED
// Paused on 25.10.2022
// FIXME Avoid drawing cards before a player name was added
// TODO Limit players to e.g. 4
// TODO Add dialog to edit/delete player! Edit: title, img | delete: player
// TODO Implement game over function and screen when drawing last card from stack
// TODO Implement game settings screen => Change bg (SVG's already exist), change lang....
// TODO Implement 'Share Game'-Button to share the gameID via email and play with others
// TODO Responsive design
