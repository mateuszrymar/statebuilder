import { Coordinate } from "../math/coordinate";
import { IPoint } from "../models/geometry.interface";
import { ISettlement, SettlementLevel } from "../models/settlement.interface"
import { TerrainName } from "../models/terrain.interface";

export class Settlement implements ISettlement {
  coordinates = Coordinate.zero();
  Id = '0,0';

  terrain = TerrainName.Grasslands;
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
    this.coordinates = new Coordinate(newCoordinates);  
    this.Id = `${this.coordinates.X},${this.coordinates.Y}`;
  }
}