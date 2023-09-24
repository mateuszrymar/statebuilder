import { IVector, IPoint } from "../models/geometry.interface";
import { Point } from "./point";

export class Vector implements IVector {
  X: number = 0;
  Y: number = 0;

  public static fromNumbers(input1: number, input2: number) {
    const result = new Vector();

    result.X = input1;
    result.Y = input2;
    
    return result;
  }

  public static fromPoints(input1: IPoint, input2: IPoint) {
    const result = new Vector();

    result.X = input2.X - input1.X;
    result.Y = input2.Y - input1.Y;
    
    return result;
  }

  length(): number {
    return Math.sqrt(Math.pow(this.X, 2) + Math.pow(this.Y, 2));
  }

  public static calcLength(vec: Vector): number {
    return Math.sqrt(Math.pow(vec.X, 2) + Math.pow(vec.Y, 2));
  }
  
  setMagnitude(num: number): Vector {
    let multiplier = num / this.length();
    this.X = this.X * multiplier;
    this.Y = this.Y * multiplier; 

    return this;
  }

  multiplyBy(multiplier: number): Vector {
    this.X = this.X * multiplier;
    this.Y = this.Y * multiplier;
    return this;
  };

  add(vec2: Vector): Vector {
    this.X += vec2.X;
    this.Y += vec2.Y;
    return this;
  }
  
  private dotProduct(vec2: Vector) {
    return (this.X * vec2.X) + (this.Y * vec2.Y);
  };
  
  vectorAngle(vec2: Vector) {
    return Math.acos(this.dotProduct(vec2) / ((this.length() * Vector.calcLength(vec2))));
  }

  toPt(vec: Vector) {
    return new Point(vec.X, vec.Y);
  }

  // intersect(vec2: Vector): Point {
  //   const intersectionX = (this.X + vec2.X) / 2;
  //   const intersectionY = (this.Y + vec2.Y) / 2;
  //   return new Point(intersectionX, intersectionY);
  // }
}