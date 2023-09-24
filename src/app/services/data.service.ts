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
  roads$ = new BehaviorSubject<Road[]>([]);

  constructor() { }

  public setSettlement(newSettlement: Settlement) {
    this.settlements.push(newSettlement);
    this.settlements$.next(this.settlements);

    if (this.settlements.length >= 2) {
      this.setRoad(newSettlement);
    }
  }

  public getSettlements() {
    return this.settlements$.asObservable();  
  }
  
  public getRoads() {
    return this.roads$.asObservable();
  }

  public getSettlement(id: string): Settlement | undefined {
    return this.settlements.find((settlement) => settlement.Id === id);
  }

  private setRoad(newSettlement: Settlement) {
    const roadToSave = new Road(newSettlement, this.getClosestSettlement(newSettlement));

    this.roads.push(roadToSave);
    this.roads$.next(this.roads);
  }

  private getClosestSettlement(newSettlement: Settlement) {
    function compareDistance(settlementA: Settlement, settlementB: Settlement) {
      const distanceA = newSettlement.coordinates.distanceTo(settlementA.coordinates);
      const distanceB = newSettlement.coordinates.distanceTo(settlementB.coordinates);
      return distanceA - distanceB;
    }

    return this.settlements.sort(compareDistance)[1];    
  }

}
