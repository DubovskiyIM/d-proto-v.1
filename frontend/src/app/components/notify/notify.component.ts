import {Component, Input, OnInit} from '@angular/core';
import {MatSnackBar} from "@angular/material/snack-bar";

@Component({
  selector: 'app-notify',
  templateUrl: './notify.component.html',
  styleUrls: ['./notify.component.scss']
})
export class NotifyComponent implements OnInit{
  @Input() durationInSeconds = 3;
  @Input() message;
  @Input() btnText = 'ok'
  constructor(private _snackBar: MatSnackBar) {

  }

  ngOnInit() {
  }

  public openSnackBar() {
    this._snackBar.open(this.message, this.btnText, {duration : this.durationInSeconds * 1000});
    // this._snackBar.openFromComponent(NotifyMessageComponent, {
    //   duration: this.durationInSeconds * 1000,
    // });
  }
}
