import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-dialog-edit-player',
  templateUrl: './dialog-edit-player.component.html',
  styleUrls: ['./dialog-edit-player.component.scss']
})
export class DialogEditPlayerComponent implements OnInit {

  constructor() { }

  ngOnInit(): void {
  }

  /**
   * When user clicks "No"
   */
  onNoClick() {
    // ....
  }

}
