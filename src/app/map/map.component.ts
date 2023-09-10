import { Component } from '@angular/core';
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
export class MapComponent {
  mapSize: number = 2048;
  mapSizePx = `${this.mapSize}px`;

  cursorPosition = new Point(0, 0);
  isCursorOnMap: boolean = false;  

  tl = new Point(0, 0);
  tr = new Point(this.mapSize, 0);
  br = new Point(this.mapSize, this.mapSize);
  bl = new Point(0, this.mapSize);

  polygonVertices = `${this.tl.toString()} ${this.tr.toString()} ${this.br.toString()} ${this.bl.toString()}`;

  constructor(private userInterfaceService: UserInterfaceService) {
  }

  checkMap(event: MouseEvent) {
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

    let lineX = Line.fromPoints(this.tl, this.tr);
    console.log(lineX);
    let lineY = Line.fromPoints(this.tl, this.bl);

    // let lineXMoved = lineX.move(Vector.fromPoints(this.tr, this.cursorPosition));
    let lineYMoved = lineY.move(Vector.fromPoints(this.bl, this.cursorPosition));

    let intersectionPointXAxis = lineYMoved.intersect(lineX);
    let intersectionY;

    console.log(intersectionPointXAxis);
  }
}
