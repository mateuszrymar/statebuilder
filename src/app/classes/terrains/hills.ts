import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Hills implements ITerrain {
  terrainName = TerrainName.Hills;
  movementSpeed = 35;
}