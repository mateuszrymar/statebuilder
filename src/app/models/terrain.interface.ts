export enum TerrainName {
  DeepWater,
  ShallowWater,
  Grasslands,
  Steppe,
  Dryland,
  Desert,
  Forest,
  Wilderness,
  Marsh,
  Hills,
  Alpine,
  Glacier,
}

export interface ITerrain {
  terrainName: TerrainName;
  movementSpeed: number;
}