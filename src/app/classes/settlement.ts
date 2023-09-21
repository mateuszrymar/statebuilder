import { Coordinates } from "../math/coordinates";
import { ISettlement, SettlementLevel } from "../models/settlement.interface"
import { Terrain } from "../models/terrain.interface";

export class Settlement implements ISettlement {
  coordinates = Coordinates.zero();

  terrain = Terrain.Grasslands;
  elevation = 1;
  isCoastal = false;
  isRiverside = false;

  level: SettlementLevel = 0;
  
  population = 10;
  populationGrowth = 5; // percent Year On Year

  foodProduction = 10;
  foodProductionGrowth = 1; // percent Year On Year

  goodsProduction = 10;
  goodsProductionGrowth = 1; // percent Year On Year

  constructor(newCoordinates: Coordinates) {
    this.coordinates = newCoordinates;  
  }
}