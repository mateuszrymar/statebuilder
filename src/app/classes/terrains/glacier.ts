import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Glacier implements ITerrain {
  terrainName = TerrainName.Glacier;
  movementSpeed = 5;
}