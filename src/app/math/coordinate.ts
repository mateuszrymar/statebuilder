import { IPoint } from "../models/geometry.interface";
import { Point } from "./point";
import { Vector } from "./vector";

export class Coordinate implements IPoint {
  X: number;
  Y: number;

  constructor(coordinates: IPoint) {
    this.X = coordinates.X;
    this.Y = coordinates.Y;
  }

  public static zero() {
    return new Coordinate(Point.zero());
  }

  public static fromVector(startPt: Coordinate, vec: Vector) {
    return new Coordinate(new Point(vec.X + startPt.X, vec.Y + startPt.Y));
  }

  public toPx() {
    return `${this.X},${this.Y}`
  }

  public distanceTo(coordsToCheck: Coordinate) {
    const point1 = new Point(this.X, this.Y);
    const point2 = new Point(coordsToCheck.X, coordsToCheck.Y);
    
    return point1.distance(point2);
  }

  move(vector: Vector) {
    this.X = this.X + vector.X;
    this.Y = this.Y + vector.Y;
    return this;
  }


}