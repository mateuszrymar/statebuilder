import { Coordinate } from "../math/coordinate";

export interface IRoad {
  Id: string;  
  points: Coordinate[];
  length: number;
}