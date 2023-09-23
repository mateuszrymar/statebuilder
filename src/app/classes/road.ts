import { Coordinates } from "../math/coordinates";
import { Guid } from "guid-typescript";
import { IRoad } from "../models/road.interface";
import { DataService } from "../services/data.service";

export class Road implements IRoad {
  Id = `0,0-0,1`;
  points: Coordinates[] = [];
  pointsPx = ``;

  private _startSettlementId: string;
  private _endSettlementId: string;

  constructor(
    private _dataService: DataService,
    startSettlementId: string, 
    endSettlementId: string
  ) {
    this.Id = `${startSettlementId}-${endSettlementId}`;
    this.points = this.setRoadPoints();
    this.setRoadPointsPx();

    this._startSettlementId = startSettlementId;
    this._endSettlementId = endSettlementId;
  }

  // public static Road

  private setRoadPoints(): Coordinates[] {
    const startSettlement = this._dataService.getSettlement(this._startSettlementId);
    const endSettlement = this._dataService.getSettlement(this._endSettlementId);

    const start = startSettlement ? startSettlement.coordinates : Coordinates.zero();
    const end = endSettlement ? endSettlement.coordinates : Coordinates.zero();
    
    return [start, end];
  }

  private setRoadPointsPx(): string {
    const points = this.points.map((coordinate) => coordinate.toPx());
    console.log(points);
    return ``;
  }
}