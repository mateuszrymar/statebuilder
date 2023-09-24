import { ITerrain, TerrainName } from "../models/terrain.interface";
import { Alpine } from "./terrains/alpine";
import { DeepWater } from "./terrains/deep-water";
import { Desert } from "./terrains/desert";
import { Dryland } from "./terrains/dryland";
import { Forest } from "./terrains/forest";
import { Glacier } from "./terrains/glacier";
import { Grasslands } from "./terrains/grasslands";
import { Hills } from "./terrains/hills";
import { Marsh } from "./terrains/marsh";
import { ShallowWater } from "./terrains/shallow-water";
import { Steppe } from "./terrains/steppe";
import { Wilderness } from "./terrains/wilderness";

export class Terrain {
  terrainName;
  terrain: ITerrain = new Grasslands;
  movementCost: number = 1;

  constructor(terrainName: TerrainName) {
    this.terrainName = terrainName;
    this.setTerrain(terrainName);
    this.movementCost = new Grasslands().movementSpeed / this.terrain.movementSpeed;
  }

  private setTerrain(terrainName: TerrainName) {
    switch(terrainName) {
      case TerrainName.DeepWater: 
        this.terrain = new DeepWater;
        break;
      case TerrainName.ShallowWater: 
        this.terrain = new ShallowWater;
        break;
      case TerrainName.Grasslands: 
        this.terrain = new Grasslands;
        break;
      case TerrainName.Steppe: 
        this.terrain = new Steppe;
        break;
      case TerrainName.Dryland: 
        this.terrain = new Dryland;
        break;
      case TerrainName.Desert: 
        this.terrain = new Desert;
        break;
      case TerrainName.Forest: 
        this.terrain = new Forest;
        break;
      case TerrainName.Wilderness: 
        this.terrain = new Wilderness;
        break;
      case TerrainName.Marsh: 
        this.terrain = new Marsh;
        break;
      case TerrainName.Hills: 
        this.terrain = new Hills;
        break;
      case TerrainName.Alpine: 
        this.terrain = new Alpine;
        break;
      case TerrainName.Glacier: 
        this.terrain = new Glacier;
        break;      
      default:
        this.terrain = new Grasslands;
        break;
    }

  }

  static movementCost(terrainName: TerrainName): number {
    return new Terrain(terrainName).movementCost;
  }

  static isWater(terrainName: TerrainName): boolean {
    if (terrainName === TerrainName.DeepWater || terrainName === TerrainName.ShallowWater) return true
    else return false;
  }

  static isLand(terrainName: TerrainName): boolean {
    return !this.isWater(terrainName);
  }
}