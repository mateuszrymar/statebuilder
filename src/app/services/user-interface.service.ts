import { Injectable } from '@angular/core';
import { IPoint } from '../models/geometry.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {
  cursorPosition: IPoint = {X: 0, Y: 0};
  isCursorOnMap = false;
  tilePosition: IPoint = {X: 0, Y: 0};

  constructor() { }

  public setCursor(newPosition: IPoint, isOnMap: boolean) {
    this.cursorPosition = newPosition;
    this.isCursorOnMap = isOnMap;
  }

  public setTilePosition(newPosition: IPoint) {
    this.tilePosition = newPosition;
  }
}
