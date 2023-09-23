import { IPoint } from "../models/geometry.interface";
import { Point } from "./point";

export class Coordinates implements IPoint {
  X: number;
  Y: number;

  constructor(coordinates: IPoint) {
    this.X = coordinates.X;
    this.Y = coordinates.Y;
  }

  public static zero() {
    return new Coordinates(Point.zero());
  }

  public toPx() {
    return `${this.X},${this.Y}`
  }

  public distanceTo(coordsToCheck: Coordinates) {
    const point1 = new Point(this.X, this.Y);
    const point2 = new Point(coordsToCheck.X, coordsToCheck.Y);
    
    return point1.distance(point2);
  }

}