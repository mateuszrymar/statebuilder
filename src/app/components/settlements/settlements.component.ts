import { Component, OnInit, OnChanges } from '@angular/core';
import { Settlement } from 'src/app/classes/settlement';
import { DataService } from 'src/app/services/data.service';
import { Observable, of, Subscription } from 'rxjs';
import { TileService } from 'src/app/services/tile.service';

@Component({
  selector: 'app-settlements',
  templateUrl: './settlements.component.html',
  styleUrls: ['./settlements.component.scss']
})
export class SettlementsComponent {
  // @TODO: Create a component that displays divs in all places that have settlements in dataService
  public settlements: Settlement[] = [];
  public tileSize: number = 0;
  public population = 0;
  public populationGrowth = 0;
  public foodProduction = 0;
  public foodProductionGrowth = 0;
  public goodsProduction = 0;
  public goodsProductionGrowth = 0;

  constructor(
    private _dataService: DataService,
    private _tileService: TileService,
  ) {}

  ngOnInit() {
    this._dataService.getSettlements().subscribe({
      next: (newSettlements) => {
        this.settlements = newSettlements;
        this.calculateKingdomModifiers(newSettlements);
      },
    })
    this.tileSize = this._tileService.tileSize;
  }

  calculateKingdomModifiers(newSettlements: Settlement[]) {
    this.population = newSettlements
      .map((settlement) => settlement.population)
      .reduce((a, b) => a + b, 0);
    this.populationGrowth = (newSettlements
      .map((settlement) => settlement.populationGrowth)
      .reduce((a, b) => a + b, 0)) / newSettlements.length / 100;

    this.foodProduction = newSettlements
      .map((settlement) => settlement.foodProduction)
      .reduce((a, b) => a + b, 0);
    this.foodProductionGrowth = (newSettlements
      .map((settlement) => settlement.foodProductionGrowth)
      .reduce((a, b) => a + b, 0)) / newSettlements.length / 100;

    this.goodsProduction = newSettlements
      .map((settlement) => settlement.goodsProduction)
      .reduce((a, b) => a + b, 0);
    this.goodsProductionGrowth = (newSettlements
      .map((settlement) => settlement.goodsProductionGrowth)
      .reduce((a, b) => a + b, 0)) / newSettlements.length / 100;
  }
}
