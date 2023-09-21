import { Terrain } from "./terrain.interface";

export interface ISettlement {  
  terrain: Terrain;
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