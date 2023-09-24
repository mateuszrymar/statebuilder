import { ITerrain, TerrainName } from "../../models/terrain.interface";

export class Grasslands implements ITerrain {
  terrainName = TerrainName.Grasslands;
  movementSpeed = 50;
}