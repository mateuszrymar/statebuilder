import { IPoint } from "../models/geometry.interface";

export class Point implements IPoint {
  X: number;
  Y: number;

  constructor(xCoordinate: number, yCoordinate: number) {
    this.X = xCoordinate;
    this.Y = yCoordinate;
  }

  distance(pt2: Point): number {
    return Math.sqrt(Math.pow((pt2.X - this.X), 2) + Math.pow((pt2.Y - this.Y), 2));
  };
}