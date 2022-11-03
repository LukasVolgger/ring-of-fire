import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { DialogEditPlayerComponent } from '../dialog-edit-player/dialog-edit-player.component';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name;
  @Input() playerActive: boolean = false;

  constructor(public dialog: MatDialog) { }

  ngOnInit(): void {
  }

  /**
   * Opens the dialog-edit-player component as dialog
   */
  openEditPlayerDialog(): void {
    const dialogRef = this.dialog.open(DialogEditPlayerComponent);

    dialogRef.afterClosed().subscribe(result => {
      console.log('The dialog was closed');
    });
  }
}
