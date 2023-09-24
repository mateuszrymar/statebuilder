import { Component, OnInit } from '@angular/core';
import { UserInterfaceService } from '../../services/user-interface.service';
import { IPoint } from '../../models/geometry.interface';
import { BalanceService } from '../../services/balance.service';
import { Settlement } from 'src/app/classes/settlement';
import { DataService } from 'src/app/services/data.service';
import { Coordinate } from 'src/app/math/coordinate';
import { Point } from 'src/app/math/point';
import { WATER_MATRIX } from 'src/assets/water-matrix';

@Component({
  selector: 'app-build-dialog',
  templateUrl: './build-dialog.component.html',
  styleUrls: ['./build-dialog.component.scss']
})
export class BuildDialogComponent {
  cursorPosition = Point.zero();
  cursorCoordinates = Coordinate.zero();
  xCursorPositionPx = `0px`;
  yCursorPositionPx = `0px`;
  message =``;

  constructor (
    private _userInterfaceService: UserInterfaceService,
    private _buildService: BalanceService,
    private _dataService: DataService,
  ) {}

  ngOnInit() {
    this.cursorPosition = this._userInterfaceService.cursorPosition;
    this.cursorCoordinates = new Point(
      this._userInterfaceService.tileCoordinates.X, 
      this._userInterfaceService.tileCoordinates.Y)
      .toCoordinates();
    this.xCursorPositionPx = `${this.cursorPosition.X}px`
    this.yCursorPositionPx = `${this.cursorPosition.Y}px`
  }

  buy(goldCost: number, settlersCost: number, event: Event) {
    const isLand = this.checkIsLand();
    if (!isLand) {
      event.stopPropagation();
      this._userInterfaceService.setToggleDialog(true);
      this.displayMessage("Cannot build on water.");
      return;
    }

    const isSucceessful = this._buildService.buy(goldCost, settlersCost);

    if (isSucceessful) {
      this._dataService.setSettlement(new Settlement(this._userInterfaceService.tileCoordinates));
      this.clearMessage();
    }
    else {
      event.stopPropagation();
      this._userInterfaceService.setToggleDialog(true);
      this.displayMessage("Not enough resources.");
    }
    
    this._dataService.getRoads();
  }

  displayMessage(message: string) {
    this.message = `${message}`;
  }

  clearMessage() {
    this.message = ``;
  }

  checkIsLand(): boolean {
    return Boolean(WATER_MATRIX[this.cursorCoordinates.Y][this.cursorCoordinates.X]);
  }
}
