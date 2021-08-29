import { Injectable } from '@angular/core';
import { MatSnackBar, MatSnackBarHorizontalPosition, MatSnackBarVerticalPosition } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarInfoService {
  sucessHorizontalPosition: MatSnackBarHorizontalPosition = 'right';
  sucessVerticalPosition: MatSnackBarVerticalPosition = 'top';
  constructor(private _snackBar: MatSnackBar) { }
  durationInSeconds = 7;
  openSucessSnackBar(info) {
    this._snackBar.open(info,'', {
      duration: this.durationInSeconds * 1000,
      horizontalPosition: this.sucessHorizontalPosition,
      verticalPosition: this.sucessVerticalPosition
    });
  }
}
