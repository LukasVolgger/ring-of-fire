import { Component, OnInit, Input } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { FirestoreService } from '../services/firestore.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {
  @Input() name;
  @Input() playerImage = 'standard_avatar.svg';
  @Input() playerActive: boolean = false;

  constructor(public dialog: MatDialog, public firestoreService: FirestoreService) { }

  ngOnInit(): void {
  }
}
