import { Coordinates } from "../math/coordinates";
import { Guid } from "guid-typescript";
import { IRoad } from "../models/road.interface";
import { DataService } from "../services/data.service";
import { Settlement } from "./settlement";

export class Road implements IRoad {
  Id = `0,0-0,1`;
  points: Coordinates[] = [];
  // pointsPx = ``;

  private _startSettlement: Settlement;
  private _endSettlement: Settlement;

  constructor(
    startSettlement: Settlement, 
    endSettlement: Settlement
  ) {
    this._startSettlement = startSettlement;
    this._endSettlement = endSettlement;

    this.Id = `${startSettlement.Id}-${endSettlement.Id}`;
    this.setRoadPoints();
    // this.setRoadPointsPx();
  }

  private setRoadPoints(): void {
    this.points = [this._startSettlement.coordinates, this._endSettlement.coordinates];
  }

  // private setRoadPointsPx(): void {
  //   const points = this.points.map((coordinate) => coordinate.toPx());
  //   this.pointsPx = `${points.join(' ')}`;
  //   console.log('road points: ', this.pointsPx);
  // }
}