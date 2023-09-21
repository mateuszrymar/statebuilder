import { IPoint } from "../models/geometry.interface";
import { Point } from "./point";

export class Coordinates implements IPoint {
  X: number;
  Y: number;

  constructor(xCoordinate: number, yCoordinate: number) {
    this.X = xCoordinate;
    this.Y = yCoordinate;
  }

  public static zero() {
    return new Coordinates(0,0);
  }

  toString(): string {
    return `${this.X},${this.Y}`;
  }
}