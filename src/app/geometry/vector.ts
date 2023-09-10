import { IVector, IPoint } from "../models/geometry.interface";

export class Vector implements IVector {
  X: number = 0;
  Y: number = 0;

  public static fromNumbers(input1: number, input2: number) {
    const result = new Vector();

    result.X = input1;
    result.Y = input2;
    
    return result;
  };

  public static fromPoints(input1: IPoint, input2: IPoint) {
    const result = new Vector();

    result.X = input2.X - input1.X;
    result.Y = input2.Y - input1.Y;
    
    return result;
  };  
}