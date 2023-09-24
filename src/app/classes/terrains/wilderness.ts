import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Wilderness implements ITerrain {
  terrainName = TerrainName.Wilderness;
  movementSpeed = 15;
}