import { Coordinate } from "../math/coordinate";
import { Guid } from "guid-typescript";
import { IRoad } from "../models/road.interface";
import { DataService } from "../services/data.service";
import { Settlement } from "./settlement";
import { Point } from "../math/point";
import { IPoint } from "../models/geometry.interface";
import { Vector } from "../math/vector";
import * as _ from "lodash";

export class Road implements IRoad {
  Id = `0,0-0,1`;
  points: Coordinate[] = [];
  length: number = 0;

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
  }

  private setRoadPoints(): void {
    const startX = this._startSettlement.coordinates.X;
    const startY = this._startSettlement.coordinates.Y;
    const endX = this._endSettlement.coordinates.X;
    const endY = this._endSettlement.coordinates.Y;

    let midpoint = Coordinate.zero();

    

    let waypoints = this.calcWaypoints(this._startSettlement.coordinates, this._endSettlement.coordinates, 1);

    midpoint = new Coordinate(new Point(
      startX, endY
    ));

    this.points = [this._startSettlement.coordinates, ...waypoints, this._endSettlement.coordinates];
  }

  private calcWaypoints(start: Coordinate, end: Coordinate, maxSegmentLength: number): Coordinate[] {
    const startEndVec = Vector.fromPoints(start, end);
    console.log("start",start);
    console.log("end",end);
    console.log("startendvec",startEndVec);
    let distance = startEndVec.length();
    const diffX = Math.abs(startEndVec.X);
    const diffY = Math.abs(startEndVec.Y);

    let waypoints: Coordinate[] = [];
    let startTrailEnd = _.cloneDeep(start);
    let startTrailWaypoints: Coordinate[] = [];
    let endTrailEnd = _.cloneDeep(end);
    let endTrailWaypoints: Coordinate[] = [];
    let trailEndVec = Vector.fromPoints(startTrailEnd, endTrailEnd);
    distance = trailEndVec.length();
    let searchVecLength = Math.max(Math.min(maxSegmentLength, Math.floor(distance/3), diffX, diffY), 1);

    while(distance > 3) {
      console.log("searchveclength",searchVecLength);
      let searchVec1 = Vector.fromNumbers(trailEndVec.X, 0).setMagnitude(searchVecLength);
      let searchVec2 = Vector.fromNumbers(0, trailEndVec.Y).setMagnitude(searchVecLength);
      let searchVec3 = Vector.fromNumbers(searchVec1.X, searchVec2.Y);
      let closestSearchVec = [searchVec1, searchVec2, searchVec3]
        .sort((a:Vector, b:Vector) => 
        _.cloneDeep(startTrailEnd).move(a).distanceTo(endTrailEnd) -
        _.cloneDeep(startTrailEnd).move(b).distanceTo(endTrailEnd))[0];
      console.log("searchvecs",[searchVec1, searchVec2, searchVec3]);

  
      startTrailEnd.move(closestSearchVec);
      console.log(startTrailEnd);
      startTrailWaypoints.push(Coordinate.fromPoint(startTrailEnd));
      trailEndVec = Vector.fromPoints(startTrailEnd, endTrailEnd);
      console.log(trailEndVec);

      distance = trailEndVec.length();
      if (distance < 3) break;
      searchVecLength = Math.max(Math.min(maxSegmentLength, Math.floor(distance/3), diffX, diffY), 1);
  
      if (distance < 3) break;
      // @TODO: this goes from the other end:
      console.log("searchveclength",searchVecLength);
      searchVec1 = Vector.fromNumbers(-trailEndVec.X, 0).setMagnitude(searchVecLength);
      searchVec2 = Vector.fromNumbers(0, -trailEndVec.Y).setMagnitude(searchVecLength);
      searchVec3 = Vector.fromNumbers(-searchVec1.X, -searchVec2.Y);
      closestSearchVec = [searchVec1, searchVec2, searchVec3]
        .sort((a:Vector, b:Vector) => 
        _.cloneDeep(endTrailEnd).move(a).distanceTo(startTrailEnd) -
        _.cloneDeep(endTrailEnd).move(b).distanceTo(startTrailEnd))[0];
      console.log("searchvecs",[searchVec1, searchVec2, searchVec3]);
  
      endTrailEnd.move(closestSearchVec);
      console.log(endTrailEnd);
      console.log(closestSearchVec);
      endTrailWaypoints.push(Coordinate.fromPoint(endTrailEnd));
      trailEndVec = Vector.fromPoints(startTrailEnd, endTrailEnd);
      console.log(trailEndVec);
      distance = Vector.fromPoints(startTrailEnd, endTrailEnd).length();
      if (distance < 3) break;
      searchVecLength = Math.max(Math.min(maxSegmentLength, Math.floor(distance/3), diffX, diffY), 1);
        
  
    }
    
    return [...startTrailWaypoints, ...endTrailWaypoints.reverse()];
  }


  private setLength():void {

  }
}