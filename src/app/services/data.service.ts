import { Injectable } from '@angular/core';
import { Settlement } from '../classes/settlement';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  settlements: Settlement[] = [];
  settlements$ = new BehaviorSubject<Settlement[]>([]);

  constructor() { }

  public setSettlement(settlementToSave: Settlement) {
    console.log("setting settlement", this.settlements);
    this.settlements.push(settlementToSave);
    this.settlements$.next(this.settlements);
  }
  
  public getSettlements() {
    return this.settlements$.asObservable();
  }
}
