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
}