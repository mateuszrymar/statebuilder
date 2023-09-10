import { Injectable } from '@angular/core';
import { ICursorPosition } from '../models/map.interface';

@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {
  cursorPosition: ICursorPosition = {X: 0, Y: 0};
  isCursorOnMap = false;

  constructor() { }

  public setCursor(newPosition: ICursorPosition, isOnMap: boolean) {
    this.cursorPosition = newPosition;
    this.isCursorOnMap = isOnMap;
  }
}
