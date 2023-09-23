import { Coordinates } from "../math/coordinates";

export interface IRoad {
  Id: string;
  
  points: Coordinates[];
  // pointsPx: string;
}