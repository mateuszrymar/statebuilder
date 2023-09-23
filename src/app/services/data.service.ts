import { Injectable } from '@angular/core';
import { Settlement } from '../classes/settlement';
import { Observable, BehaviorSubject } from 'rxjs';
import { Road } from '../classes/road';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  settlements: Settlement[] = [];
  settlements$ = new BehaviorSubject<Settlement[]>([]);

  roads: Road[] = [];
  roads$ = new BehaviorSubject<Settlement[]>([]);

  constructor() { }

  public setSettlement(settlementToSave: Settlement) {
    this.settlements.push(settlementToSave);
    this.settlements$.next(this.settlements);
    console.log("setting settlement", this.settlements);
    // this.setRoad(new Road());
  }
  
  public getSettlements() {
    return this.settlements$.asObservable();
  }

  public getSettlement(id: string): Settlement | undefined {
    return this.settlements.find((settlement) => settlement.Id === id);
  }

  private setRoad(roadToSave: Road) {
    console.log("setting road", this.settlements);
    this.roads.push(roadToSave);
    this.roads$.next(this.settlements);
  }

}
