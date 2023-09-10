import { Component } from '@angular/core';
import { UserInterfaceService } from '../services/user-interface.service';
import { IPoint } from '../models/geometry.interface';
import { Point } from '../math/point';

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
    this.calculatePositionOnMap(event);
    this.userInterfaceService.setCursor(this.cursorPosition, this.isCursorOnMap);
  }

  calculatePositionOnMap(event: MouseEvent) {
    this.cursorPosition.X = event.clientX;
    this.cursorPosition.Y = event.clientY;
  }
}
