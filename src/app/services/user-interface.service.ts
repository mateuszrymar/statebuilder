import { Injectable, OnInit } from '@angular/core';
import { IPoint } from '../models/geometry.interface';
import { Subject, BehaviorSubject, Observable } from 'rxjs';
import { Coordinate } from '../math/coordinate';
import { Point } from '../math/point';
import { TimeService } from './time.service';


@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {
  cursorPosition: IPoint = Point.zero();
  isCursorOnMap = false;
  tileCoordinates: Coordinate = Coordinate.zero();
  isDialogVisible = new BehaviorSubject<boolean>(false);
  dialogPosition: IPoint = Point.zero();

  constructor(
  ) { }

  ngOnInit() {
  }

  public setCursor(newPosition: IPoint, isOnMap: boolean) {
    this.cursorPosition = newPosition;
    this.isCursorOnMap = isOnMap;
  }

  public getCursor() {

  }

  public setTilePosition(newPosition: Coordinate) {
    this.tileCoordinates = newPosition;
  }

  public setToggleDialog(toggle: boolean) {
    this.isDialogVisible.next(toggle);
  }

  public getToggleDialog() {
    return this.isDialogVisible.asObservable();
  }
}
