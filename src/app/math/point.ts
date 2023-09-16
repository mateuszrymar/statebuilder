import { IPoint } from "../models/geometry.interface";
import { Vector } from "./vector";

export class Point implements IPoint {
  X: number;
  Y: number;

  constructor(xCoordinate: number, yCoordinate: number) {
    this.X = xCoordinate;
    this.Y = yCoordinate;
  }

  public static zero(): Point {
    return new Point(0,0);
  }

  distance(pt2: Point): number {
    return Math.sqrt(Math.pow((pt2.X - this.X), 2) + Math.pow((pt2.Y - this.Y), 2));
  };

  toString(): string {
    return `${this.X}, ${this.Y}`;
  }

  move(vector: Vector) {
    this.X = this.X + vector.X;
    this.Y = this.Y + vector.Y;
    return this;
  }

  copy(): Point {
    return new Point(this.X, this.Y);
  }
}