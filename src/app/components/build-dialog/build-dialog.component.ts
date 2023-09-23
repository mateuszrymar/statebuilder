import { Component, OnInit } from '@angular/core';
import { UserInterfaceService } from '../../services/user-interface.service';
import { IPoint } from '../../models/geometry.interface';
import { BalanceService } from '../../services/balance.service';
import { Settlement } from 'src/app/classes/settlement';
import { DataService } from 'src/app/services/data.service';
import { Coordinates } from 'src/app/math/coordinates';
import { Point } from 'src/app/math/point';

@Component({
  selector: 'app-build-dialog',
  templateUrl: './build-dialog.component.html',
  styleUrls: ['./build-dialog.component.scss']
})
export class BuildDialogComponent {
  cursorPosition = Point.zero();
  xCursorPositionPx = `0px`;
  yCursorPositionPx = `0px`;

  constructor (
    private _userInterfaceService: UserInterfaceService,
    private _buildService: BalanceService,
    private _dataService: DataService,
  ) {}

  ngOnInit() {
    this.cursorPosition = this._userInterfaceService.cursorPosition;
    this.xCursorPositionPx = `${this.cursorPosition.X}px`
    this.yCursorPositionPx = `${this.cursorPosition.Y}px`
  }

  buy(goldCost: number, settlersCost: number) {
    const isSucceessful = this._buildService.buy(goldCost, settlersCost);

    if (isSucceessful) {
      this._dataService.setSettlement(new Settlement(this._userInterfaceService.tileCoordinates));
    };
    
    console.log(this._userInterfaceService.tileCoordinates);
    this._dataService.getRoads();
  }
}
