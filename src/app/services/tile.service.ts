import { Injectable } from '@angular/core';
import { Point } from '../math/point';
import { MapService } from './map.service';
import { Subject, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TileService {
  public tileCount = 64;
  public tileSize = this._mapService.mapSize / this.tileCount;
  public tileSizePx = `${this.tileSize}px`;

  public tilePosition = Point.zero();
  private xTilePositionPx = new BehaviorSubject<string>(`${this.tilePosition.X}px`);
  private yTilePositionPx = new BehaviorSubject<string>(`${this.tilePosition.Y}px`);

  constructor(
    private _mapService: MapService
  ) { }

  setTileSize(newTileSize: number) {
    this.tileSize = newTileSize;
  }

  setTilePosition(newPosition: Point) {
    this.tilePosition = newPosition;
    this.xTilePositionPx.next(`${newPosition.X * this.tileSize}px`);
    this.yTilePositionPx.next(`${newPosition.Y * this.tileSize}px`);
  }

  getXTilePositionPx() {
    return this.xTilePositionPx.asObservable();
  }

  getYTilePositionPx() {
    return this.yTilePositionPx.asObservable();
  }
}