import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Forest implements ITerrain {
  terrainName = TerrainName.Forest;
  movementSpeed = 30;
}