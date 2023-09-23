import { Component, OnInit } from '@angular/core';
import { Road } from 'src/app/classes/road';
import { Settlement } from 'src/app/classes/settlement';
import { Coordinates } from 'src/app/math/coordinates';
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
  polylinePoints: string = "10,10 20,20";
  roads: Road[] = [];

  constructor(
    private _dataService: DataService,
    private _tileService: TileService,
  ) {}

  ngOnInit() {
    this._dataService.getRoads().subscribe({
      next: (newRoads) => {
        this.roads = newRoads;
        console.log('new roads loaded.');
      },
    })
    this.tileSize = this._tileService.tileSize;
  }

  setPolylinePoints(coords: Coordinates[]) {
    this.polylinePoints = this.convertCoordinatesToString(coords);
  }

  private convertCoordinatesToString(coordinates: Coordinates[]): string {
    return coordinates.map(coord => `${coord.X},${coord.Y}`).join(' ');
  }

  public getPolyline(road: Road) {
    const roadPoints = road.points
      .map((point) => `${point.X*this.tileSize + this.tileSize/2},${point.Y*this.tileSize + this.tileSize/2}`)
      .join(' ');

    console.log(roadPoints);

    return roadPoints;
  }

}
