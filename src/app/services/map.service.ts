import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public mapSize: number = 2048;
  public mapSizePx = `${this.mapSize}px`;

  constructor() { }
}
