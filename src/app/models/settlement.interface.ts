import { Coordinate } from "../math/coordinate";
import { TerrainName } from "./terrain.interface";

export interface ISettlement {
  coordinates: Coordinate;
  Id: string;

  terrain: TerrainName;
  elevation: number;
  isCoastal: boolean;
  isRiverside: boolean;

  level: SettlementLevel;
  
  population: number;
  populationGrowth: number; // percent Year On Year

  foodProduction: number;
  foodProductionGrowth: number; // percent Year On Year

  goodsProduction: number;
  goodsProductionGrowth: number; // percent Year On Year
}

export enum SettlementLevel {
  Village,
  Town,
  City
}