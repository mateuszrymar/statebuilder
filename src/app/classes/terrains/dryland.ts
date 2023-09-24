import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Dryland implements ITerrain {
  terrainName = TerrainName.Dryland;
  movementSpeed = 50;
}