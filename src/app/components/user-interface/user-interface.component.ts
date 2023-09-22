import { AfterViewInit, Component } from '@angular/core';
import { UserInterfaceService } from '../../services/user-interface.service';
import { IPoint } from '../../models/geometry.interface';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { TileService } from '../../services/tile.service';
import { BalanceService } from '../../services/balance.service';
import { TimeService } from 'src/app/services/time.service';


@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent {
  public cursorPosition: IPoint = {X: 0, Y: 0};
  public isDialogVisible = false;
  public isCursorOnMap = false;
  public goldBalance = 0;
  public settlersBalance = 0;
  public time = 0;
  private _isDialogVisible$: Subscription = new Subscription();
  private _goldBalance$: Subscription = new Subscription();
  private _settlersBalance$: Subscription = new Subscription();
  private _time$: Subscription = new Subscription();
  
  constructor(
    private _userInterfaceService: UserInterfaceService,
    private _tileService: TileService,
    private _buildService: BalanceService,
    private _timeService: TimeService,
  ) {}

  ngOnInit() {
    this._isDialogVisible$ = this._userInterfaceService.getToggleDialog().subscribe((isActive) => {
      this.isDialogVisible = isActive;
    });

    this._goldBalance$ = this._buildService.getGoldBalance().subscribe((goldBalance) => {
      this.goldBalance = goldBalance;
    });

    this._settlersBalance$ = this._buildService.getSettlersBalance().subscribe((settlersBalance) => {
      this.settlersBalance = settlersBalance;
    });

    this._settlersBalance$ = this._timeService.getTimer().subscribe((time) => {
      this.time = time;
    });

  }

  public getTileX(): number {
    return this._userInterfaceService.tileCoordinates.X;
  }

  public getTileY(): number {
    return this._userInterfaceService.tileCoordinates.Y;
  }

  public getIsOnMap(): boolean {
    return this._userInterfaceService.isCursorOnMap;
  }

  public getCursorPosition(): IPoint {
    return this.cursorPosition;
  }

  closeDialog() {
    this._userInterfaceService.setToggleDialog(false);
    // this._tileService.setTileClicked(false);
  }
}
