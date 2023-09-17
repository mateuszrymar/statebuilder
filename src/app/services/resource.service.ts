import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ResourceService {
  gold = 100;
  settlers = 20;

  constructor() { }
}
