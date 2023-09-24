import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Marsh implements ITerrain {
  terrainName = TerrainName.Marsh;
  movementSpeed = 10;
}