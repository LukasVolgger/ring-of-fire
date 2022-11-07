import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-game-settings',
  templateUrl: './dialog-game-settings.component.html',
  styleUrls: ['./dialog-game-settings.component.scss']
})
export class DialogGameSettingsComponent implements OnInit {
  gameBackgrounds = ['cherries_bg.svg', 'christmas_bg.svg', 'halloween_bg.svg', 'stars_bg.svg', 'wood_bg.svg'];

  constructor(public dialogRef: MatDialogRef<DialogGameSettingsComponent>) { }

  ngOnInit(): void {
  }

}
