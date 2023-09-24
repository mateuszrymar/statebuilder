import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Desert implements ITerrain {
  terrainName = TerrainName.Desert;
  movementSpeed = 40;
}