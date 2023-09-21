import { Injectable } from '@angular/core';
import { Settlement } from '../classes/settlement';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  settlements: Settlement[] = [];

  constructor() { }

  setSettlement(settlementToSave: Settlement) {
    this.settlements.push(settlementToSave);
  }
  
  public getSettlements() {
    console.log(this.settlements);
  }
}
