import { Component, Input, OnInit, OnDestroy } from '@angular/core';
import { TileService } from '../../services/tile.service';
import { Subscription } from 'rxjs';
import { UserInterfaceService } from '../../services/user-interface.service';

@Component({
  selector: 'app-tile',
  templateUrl: './tile.component.html',
  styleUrls: ['./tile.component.scss']
})
export class TileComponent implements OnInit {
  tileSizePx = this._tileService.tileSizePx;
  xTilePositionPx = '0px';
  yTilePositionPx = '0px';

  isDialogVisible = false;

  private positionXSubscription: Subscription = new Subscription();
  private positionYSubscription: Subscription = new Subscription();
  private isDialogVisibleSubscription: Subscription = new Subscription();

  constructor(
    private _tileService: TileService,
    private _userInterfaceService: UserInterfaceService
  ) {}

  ngOnInit() {
    this.positionXSubscription = this._tileService.getXTilePositionPx().subscribe((position) => {
      this.xTilePositionPx = position;
    });
    this.positionYSubscription = this._tileService.getYTilePositionPx().subscribe((position) => {
      this.yTilePositionPx = position;
    });
    this.isDialogVisibleSubscription = this._userInterfaceService.getToggleDialog().subscribe((isVisible) => {
      this.isDialogVisible = isVisible;
    });
  }

  public toggleClicked() {
    this._tileService.setTileClicked(this.isDialogVisible);
  }
}
