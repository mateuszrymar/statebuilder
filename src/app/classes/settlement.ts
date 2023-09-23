import { Coordinates } from "../math/coordinates";
import { IPoint } from "../models/geometry.interface";
import { ISettlement, SettlementLevel } from "../models/settlement.interface"
import { Terrain } from "../models/terrain.interface";

export class Settlement implements ISettlement {
  coordinates = Coordinates.zero();
  Id = '0,0';

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

  constructor(newCoordinates: IPoint) {
    this.coordinates = new Coordinates(newCoordinates);  
    this.Id = `${this.coordinates.X},${this.coordinates.Y}`;
  }
}