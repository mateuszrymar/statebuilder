import { Component } from '@angular/core';
import { Coordinates } from 'src/app/math/coordinates';

@Component({
  selector: 'app-polyline',
  templateUrl: './polyline.component.html',
  styleUrls: ['./polyline.component.scss']
})
export class PolylineComponent {
  polylinePoints: string = "20,20 40,25 60,40 80,120 120,140 200,180";

  setPolylinePoints(coords: Coordinates[]) {
    this.polylinePoints = this.convertCoordinatesToString(coords);
  }

  private convertCoordinatesToString(coordinates: Coordinates[]): string {
    return coordinates.map(coord => `${coord.X},${coord.Y}`).join(' ');
  }
}
