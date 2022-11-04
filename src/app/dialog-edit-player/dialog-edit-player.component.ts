import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent implements OnInit {
  allGameAvatars = ['bee.svg', 'penguin.svg', 'standard_avatar.svg', 'woman_blue.svg', 'woman_pink.svg'];
  newPlayerName: string = '';

  constructor(public dialogRef: MatDialogRef<DialogEditPlayerComponent>) { }

  ngOnInit(): void {
  }

}
