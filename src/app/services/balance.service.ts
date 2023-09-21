import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BalanceService {
  public goldBalance = new BehaviorSubject<number>(500);
  public settlersBalance = new BehaviorSubject<number>(100);

  constructor() { }

  public buy(goldCost: number, settlersCost: number): Boolean {
    let currentGold = this.goldBalance.value;
    let currentSettlers = this.settlersBalance.value;

    if (goldCost <= currentGold && settlersCost <= currentSettlers) {
      this.goldBalance.next(currentGold - goldCost);
      this.settlersBalance.next(currentSettlers - settlersCost);
      return true;
    }
    else return false;
  }

  public getGoldBalance() {
    return this.goldBalance.asObservable();
  }

  public getSettlersBalance() {
    return this.settlersBalance.asObservable();
  }

}
