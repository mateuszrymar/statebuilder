import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TileService } from '../services/tile.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  tileSizePx = this._tileService.tileSizePx;
  xTilePositionPx = '0px';
  yTilePositionPx = '0px';

  isClicked = false;

  private positionXSubscription: Subscription = new Subscription();
  private positionYSubscription: Subscription = new Subscription();

  constructor(
    private _tileService: TileService
  ) {}

  ngOnInit() {
    this.positionXSubscription = this._tileService.getXTilePositionPx().subscribe((position) => {
      this.xTilePositionPx = position;
    });
    this.positionYSubscription = this._tileService.getYTilePositionPx().subscribe((position) => {
      this.yTilePositionPx = position;
    });
  }

  public toggleClicked() {
    this.isClicked = !this.isClicked;
    console.log(this.isClicked);
  }

}
