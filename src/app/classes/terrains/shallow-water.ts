import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class ShallowWater implements ITerrain {
  terrainName = TerrainName.ShallowWater;
  movementSpeed = 100;
}