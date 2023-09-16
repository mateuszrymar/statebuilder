import { Component, OnInit, ElementRef } from '@angular/core';
import { UserInterfaceService } from '../services/user-interface.service';
import { IPoint } from '../models/geometry.interface';
import { Point } from '../math/point';
import { Line } from '../math/line';
import { Vector } from '../math/vector';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit {
  mapSize: number = 2048;
  tileCount = 64;
  mapSizePx = `${this.mapSize}px`;
  tileSize = this.mapSize / this.tileCount;
  tileSizePx = `${this.tileSize}px`;
  xUnit = Vector.fromNumbers(0,1);
  yUnit = Vector.fromNumbers(0,1);
  xTilePositionPx = `100px`;
  yTilePositionPx = `100px`;

  cursorPosition = new Point(0, 0);
  isCursorOnMap: boolean = false;  

  tl = new Point(0, 0);
  tr = new Point(this.mapSize, 0);
  br = new Point(this.mapSize, this.mapSize);
  bl = new Point(0, this.mapSize);

  polygonVertices = `${this.tl.toString()} ${this.tr.toString()} ${this.br.toString()} ${this.bl.toString()}`;

  topLeft!: Point;
  topRight!: Point;
  bottomRight!: Point;
  bottomLeft!: Point;

  testLine_01 = Line.fromPoints(new Point(0,0), new Point(0,0));
  testLine_02 = Line.fromPoints(new Point(0,0), new Point(0,0));
  public testPoint_01 = new Point(0,0);
  testPoint_02 = new Point(0,0);

  tilePosition = new Point(0,0);

  constructor(private userInterfaceService: UserInterfaceService, private elementRef: ElementRef) {
  }

  ngOnInit(): void {
    this.createTestPoints();
  }

  createTestPoints() {
    this.topLeft = new Point(
      document.querySelector("#topLeft")!.getBoundingClientRect().left,
      document.querySelector("#topLeft")!.getBoundingClientRect().top,
    );
    this.topRight = new Point(
      document.querySelector("#topRight")!.getBoundingClientRect().left,
      document.querySelector("#topRight")!.getBoundingClientRect().top,
    );
    this.bottomRight = new Point(
      document.querySelector("#bottomRight")!.getBoundingClientRect().left,
      document.querySelector("#bottomRight")!.getBoundingClientRect().top,
    );
    this.bottomLeft = new Point(
      document.querySelector("#bottomLeft")!.getBoundingClientRect().left,
      document.querySelector("#bottomLeft")!.getBoundingClientRect().top,
    );
  }

  calculateUnits(): void {
    this.xUnit = Vector.fromPoints(this.topLeft, this.topRight).multiplyBy(1/this.tileCount);
    this.yUnit = Vector.fromPoints(this.topLeft, this.bottomLeft).multiplyBy(1/this.tileCount);
  }

  checkMap(event: MouseEvent) {
    this.createTestPoints();
    this.calculateUnits();
    this.setCursor(event);
    this.setTilePosition();
    this.calculateTilePosition(event);
    this.userInterfaceService.setCursor(this.cursorPosition, this.isCursorOnMap);
  }

  setCursor(event: MouseEvent) {
    this.cursorPosition.X = event.clientX;
    this.cursorPosition.Y = event.clientY;
  }

  setTilePosition() {
    this.userInterfaceService.setTilePosition(this.tilePosition);

    this.xTilePositionPx = `${this.tilePosition.X * this.tileSize}px`;
    this.yTilePositionPx = `${this.tilePosition.Y * this.tileSize}px`;  
  }

  calculateTilePosition(event: MouseEvent): void {
    let lineX = Line.fromPoints(this.topLeft, this.topRight);
    let lineY = Line.fromPoints(this.topLeft, this.bottomLeft);

    let vector = Vector.fromPoints(this.topRight, this.cursorPosition);
    let vector2 = Vector.fromPoints(this.bottomLeft, this.cursorPosition);

    let lineXMoved = Line.fromPoints(this.topLeft.copy().move(vector), this.topRight.copy().move(vector));
    let lineYMoved = Line.fromPoints(this.topLeft.copy().move(vector2), this.bottomLeft.copy().move(vector2));

    this.testLine_01 = lineYMoved;
    this.testLine_02 = lineX;

    let intersectionDomain = lineXMoved.intersectionDomain(lineY);
    
    let tilePositionX = (1 - intersectionDomain.X);
    let tilePositionY = intersectionDomain.Y;
    
    let unitPositionX = Math.floor(tilePositionX * this.mapSize / this.tileSize)
    let unitPositionY = Math.floor(tilePositionY * this.mapSize / this.tileSize)

    this.tilePosition = new Point(unitPositionX, unitPositionY);
  }
}
