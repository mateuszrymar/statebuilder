import { Component, OnInit } from '@angular/core';
import { UserInterfaceService } from '../services/user-interface.service';
import { IPoint } from '../models/geometry.interface';
import { BalanceService } from '../services/balance.service';

@Component({
  selector: 'app-build-dialog',
  templateUrl: './build-dialog.component.html',
  styleUrls: ['./build-dialog.component.scss']
})
export class BuildDialogComponent {
  cursorPosition: IPoint = {X: 0, Y: 0};
  xCursorPositionPx = `0px`;
  yCursorPositionPx = `0px`;

  constructor (
    private _userInterfaceService: UserInterfaceService,
    private _buildService: BalanceService,
  ) {}

  ngOnInit() {
    this.cursorPosition = this._userInterfaceService.cursorPosition;
    this.xCursorPositionPx = `${this.cursorPosition.X}px`
    this.yCursorPositionPx = `${this.cursorPosition.Y}px`
  }

  buy(goldCost: number, settlersCost: number) {
    this._buildService.buy(goldCost, settlersCost);
    console.log(this.cursorPosition);
  }
}
