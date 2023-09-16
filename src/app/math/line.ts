import { Point } from "./point";
import { Vector } from "./vector";

export class Line {
  start: Point = new Point(0, 0);
  end: Point = new Point(0, 0);

  public static fromPoints(input1: Point, input2: Point) {
    const result = new Line();

    result.start = input1;
    result.end = input2;
    
    return result;
  }

  length(): number {
    return Vector.fromPoints(this.start, this.end).length();
  }

  intersect(line2: Line): Point {
    let t = this.intersectionDomain(line2).X;
    
    let resultX = this.start.X + t*(this.end.X - this.start.X);
    let resultY = this.start.Y + t*(this.end.Y - this.start.Y);

    return new Point(resultX, resultY);
  }

  intersectionDomain(line2: Line): Point {
    let t: number;
    let u: number;

    t = (
      (this.start.X - line2.start.X) * (line2.start.Y - line2.end.Y) -
      (this.start.Y - line2.start.Y) * (line2.start.X - line2.end.X)) / (
      (this.start.X - this.end.X) * (line2.start.Y - line2.end.Y) -
      (this.start.Y - this.end.Y) * (line2.start.X - line2.end.X)
    );
    u = (
      (this.start.X - line2.start.X) * (this.start.Y - this.end.Y) -
      (this.start.Y - line2.start.Y) * (this.start.X - this.end.X)) / (
      (this.start.X - this.end.X) * (line2.start.Y - line2.end.Y) -
      (this.start.Y - this.end.Y) * (line2.start.X - line2.end.X)
    );

    return new Point(t, u);
  }
}