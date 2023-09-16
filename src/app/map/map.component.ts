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
  mapSizePx = `${this.mapSize}px`;

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
    ) ;
    this.bottomRight = new Point(
      document.querySelector("#bottomRight")!.getBoundingClientRect().left,
      document.querySelector("#bottomRight")!.getBoundingClientRect().top,
    ) ;
    this.bottomLeft = new Point(
      document.querySelector("#bottomLeft")!.getBoundingClientRect().left,
      document.querySelector("#bottomLeft")!.getBoundingClientRect().top,
    ) ;
    console.log(this.topLeft);
    console.log(this.topRight);
    console.log(this.bottomRight);
    console.log(this.bottomLeft);
  }

  checkMap(event: MouseEvent) {
    this.createTestPoints();
    this.setCursor(event);
    this.calculatePositionOnMap(event);

    this.userInterfaceService.setCursor(this.cursorPosition, this.isCursorOnMap);
  }

  setCursor(event: MouseEvent) {
    this.cursorPosition.X = event.clientX;
    this.cursorPosition.Y = event.clientY;
  }

  calculatePositionOnMap(event: MouseEvent) {
    // @TODO: To calculate position on map, we need to read points
    // from real DOM values.

    let lineX = Line.fromPoints(this.topLeft, this.topRight);
    
    console.log('unmoved', lineX);
    let lineY = Line.fromPoints(this.topLeft, this.bottomLeft);

    let vector = Vector.fromPoints(this.topRight, this.cursorPosition);
    let vector2 = Vector.fromPoints(this.bottomLeft, this.cursorPosition);

    let lineXMoved = Line.fromPoints(this.topLeft.copy().move(vector), this.topRight.copy().move(vector));
    let lineYMoved = Line.fromPoints(this.topLeft.copy().move(vector2), this.bottomLeft.copy().move(vector2));

    this.testLine_01 = lineYMoved;
    this.testLine_02 = lineX;


    let intersectionPointXAxis = lineYMoved.intersect(lineX);
    let intersectionPointYAxis = lineXMoved.intersect(lineY);

    this.testPoint_01 = intersectionPointXAxis;
    this.testPoint_02 = intersectionPointYAxis;


    console.log(intersectionPointXAxis);
    console.log(intersectionPointYAxis);
  }
}
