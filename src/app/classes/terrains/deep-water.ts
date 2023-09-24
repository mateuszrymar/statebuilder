import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class DeepWater implements ITerrain {
  terrainName = TerrainName.DeepWater;
  movementSpeed = 150;
}