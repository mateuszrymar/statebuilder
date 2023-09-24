import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Alpine implements ITerrain {
  terrainName = TerrainName.Alpine;
  movementSpeed = 10;
}