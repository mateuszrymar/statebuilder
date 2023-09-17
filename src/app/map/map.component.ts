import { Component, OnInit, ElementRef } from '@angular/core';
import { UserInterfaceService } from '../services/user-interface.service';
import { IPoint } from '../models/geometry.interface';
import { Point } from '../math/point';
import { Line } from '../math/line';
import { Vector } from '../math/vector';
import { TileService } from '../services/tile.service';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  private mapSize = this._mapService.mapSize;
  public mapSizePx = this._mapService.mapSizePx;

  public cursorPosition = Point.zero();
  public isCursorOnMap: boolean = false;  

  private tl = new Point(0, 0);
  private tr = new Point(this.mapSize, 0);
  private br = new Point(this.mapSize, this.mapSize);
  private bl = new Point(0, this.mapSize);

  polygonVertices = `${this.tl.toString()} ${this.tr.toString()} ${this.br.toString()} ${this.bl.toString()}`;

  topLeft!: Point;
  topRight!: Point;
  bottomRight!: Point;
  bottomLeft!: Point;

  xUnit = Vector.fromNumbers(0,1);
  yUnit = Vector.fromNumbers(0,1);  

  tileSize = this.mapSize / this._tileService.tileCount;
  tileSizePx = `${this.tileSize}px`;
  xTilePositionPx = `0px`;
  yTilePositionPx = `0px`;
  tilePosition = Point.zero();

  constructor(
    private _userInterfaceService: UserInterfaceService,
    private _tileService: TileService,
    private _mapService: MapService,
    private _elementRef: ElementRef
  ) {}

  ngOnInit(): void {
    this.createTestPoints();
    this.setTilePosition();
  }

  createTestPoints() {
    this.topLeft = this.getPoint("#topLeft");
    this.topRight = this.getPoint("#topRight");
    this.bottomRight = this.getPoint("#bottomRight");
    this.bottomLeft = this.getPoint("#bottomLeft");
  }

  getPoint(id: string) {
    return new Point(
      document.querySelector(id)!.getBoundingClientRect().left,
      document.querySelector(id)!.getBoundingClientRect().top)
  }

  calculateUnits(): void {
    this.xUnit = Vector.fromPoints(this.topLeft, this.topRight).multiplyBy(1/this._tileService.tileCount);
    this.yUnit = Vector.fromPoints(this.topLeft, this.bottomLeft).multiplyBy(1/this._tileService.tileCount);
  }

  checkMap(event: MouseEvent) {
    this.createTestPoints();
    this.calculateUnits();
    this.setCursor(event);
    this.calculateTilePosition(event);
    this.setTilePosition();
    this._userInterfaceService.setCursor(this.cursorPosition, this.isCursorOnMap);
  }

  setCursor(event: MouseEvent) {
    this.cursorPosition.X = event.clientX;
    this.cursorPosition.Y = event.clientY;
  }

  setTilePosition() {
    this._userInterfaceService.setTilePosition(this.tilePosition);
    this._tileService.setTilePosition(this.tilePosition);

    this.xTilePositionPx = `${this.tilePosition.X * this.tileSize}px`;
    this.yTilePositionPx = `${this.tilePosition.Y * this.tileSize}px`;  
  }

  calculateTilePosition(event: MouseEvent): void {
    let vector = Vector.fromPoints(this.topRight, this.cursorPosition);
    let lineXMoved = Line.fromPoints(this.topLeft.copy().move(vector), this.topRight.copy().move(vector));
    let lineY = Line.fromPoints(this.topLeft, this.bottomLeft);

    let intersectionDomain = lineXMoved.intersectionDomain(lineY);
    
    let unitPositionX = Math.floor((1 - intersectionDomain.X) * this.mapSize / this.tileSize)
    let unitPositionY = Math.floor(intersectionDomain.Y * this.mapSize / this.tileSize)

    this.tilePosition = new Point(unitPositionX, unitPositionY);
  }
}
