import { Component } from '@angular/core';
import { UserInterfaceService } from '../services/user-interface.service';
import { ICursorPosition } from '../models/map.interface';

@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent {
  cursorPosition: ICursorPosition = {X: 0, Y: 0};
  isCursorOnMap: boolean = false;
  mapSize: number = 2048;
  mapSizePx = `${this.mapSize}px`;
  polygonVertices = `0,0 ${this.mapSize},0 ${this.mapSize},${this.mapSize} 0,${this.mapSize}`;

  constructor(private userInterfaceService: UserInterfaceService) {
  }

  ngAfterViewInit(): void {
  }

  checkMap(event: MouseEvent) {
    this.calculatePositionOnMap(event);
    this.userInterfaceService.setCursor(this.cursorPosition, this.isCursorOnMap);
  }

  calculatePositionOnMap(event: MouseEvent) {
    this.cursorPosition = {X: event.clientX, Y: event.clientY};
  }
}