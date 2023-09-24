import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Steppe implements ITerrain {
  terrainName = TerrainName.Steppe;
  movementSpeed = 40;
}