import { Component, OnInit } from '@angular/core';
import { Road } from 'src/app/classes/road';
import { Settlement } from 'src/app/classes/settlement';
import { Coordinate } from 'src/app/math/coordinate';
import { Point } from 'src/app/math/point';
import { DataService } from 'src/app/services/data.service';
import { TileService } from 'src/app/services/tile.service';

@Component({
  selector: 'app-roads',
  templateUrl: './roads.component.html',
  styleUrls: ['./roads.component.scss']
})
export class RoadsComponent {
  tileSize = 0;
  roads: Road[] = [];
  roadPoints: string[] = [];

  constructor(
    private _dataService: DataService,
    private _tileService: TileService,
  ) {}

  ngOnInit() {
    this._dataService.getRoads().subscribe({
      next: (newRoads) => {
        this.roads = newRoads;
        this.setPolylinePoints(newRoads);
      },
    })
    this.tileSize = this._tileService.tileSize;
  }

  setPolylinePoints(roads: Road[]) {
    this.roadPoints = roads
      .map((road) => road.points
        .map((point) => `${point.X*this.tileSize + this.tileSize/2},${point.Y*this.tileSize + this.tileSize/2}`)
        .join(' ')
      )
  }
}
