import { Injectable } from '@angular/core';
import { IPoint } from '../models/geometry.interface';
import { Subject, BehaviorSubject } from 'rxjs';
import { Coordinates } from '../math/coordinates';
import { Point } from '../math/point';


@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {
  cursorPosition: IPoint = Point.zero();
  isCursorOnMap = false;
  tileCoordinates: IPoint = new Coordinates(0,0);
  isDialogVisible  = new BehaviorSubject<boolean>(false);
  dialogPosition: IPoint = Point.zero();

  constructor() { }

  public setCursor(newPosition: IPoint, isOnMap: boolean) {
    this.cursorPosition = newPosition;
    this.isCursorOnMap = isOnMap;
  }

  public setTilePosition(newPosition: IPoint) {
    this.tileCoordinates = newPosition;
  }

  public setToggleDialog(toggle: boolean) {
    this.isDialogVisible.next(toggle);
  }

  public getToggleDialog() {
    return this.isDialogVisible.asObservable();
  }
}
