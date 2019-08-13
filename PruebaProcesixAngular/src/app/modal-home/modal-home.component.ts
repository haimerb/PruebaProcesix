import { Component, OnInit,Inject } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material';

/**
 * @title Injecting data when opening a dialog
 */
@Component({
  selector: 'app-modal-home',
  templateUrl: './modal-home.component.html',
  styleUrls: ['./modal-home.component.css']
})
export class ModalHomeComponent implements OnInit {

  constructor(public dialog: MatDialog) {}

  openDialog() {
    const dialogRef = this.dialog.open(ModalHomeComponentDialog);

    dialogRef.afterClosed().subscribe(result => {
      console.log(`Dialog result: ${result}`);
    });
  }

  ngOnInit() {
  }
}

@Component({
  selector: 'app-modal-home-dialog',
  templateUrl: 'modal-home.component-dialog.html',
})
export class ModalHomeComponentDialog {}
