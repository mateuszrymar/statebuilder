import { Injectable, OnInit } from '@angular/core';
import { Observable, timer } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TimeService {
  private gameSpeed = 12000;
  private timer$: Observable<number> = timer(0, this.gameSpeed);

  constructor() { }

  ngOnInit() {
  }

  getTimer() {
    return this.timer$;
  }
}
