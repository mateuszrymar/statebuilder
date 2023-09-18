import { Injectable } from '@angular/core';
import { IPoint } from '../models/geometry.interface';
import { ResourceService } from './resource.service';
import { Subject, BehaviorSubject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class UserInterfaceService {
  cursorPosition: IPoint = {X: 0, Y: 0};
  isCursorOnMap = false;
  tilePosition: IPoint = {X: 0, Y: 0};
  isDialogVisible  = new BehaviorSubject<boolean>(false);
  dialogPosition: IPoint = {X: 0, Y: 0};

  constructor() { }

  public setCursor(newPosition: IPoint, isOnMap: boolean) {
    this.cursorPosition = newPosition;
    this.isCursorOnMap = isOnMap;
  }

  public setTilePosition(newPosition: IPoint) {
    this.tilePosition = newPosition;
  }

  public setToggleDialog(toggle: boolean) {
    this.isDialogVisible.next(toggle);
  }

  public getToggleDialog() {
    return this.isDialogVisible.asObservable();
  }
}
