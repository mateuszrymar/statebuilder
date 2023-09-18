import { AfterViewInit, Component } from '@angular/core';
import { UserInterfaceService } from '../services/user-interface.service';
import { IPoint } from '../models/geometry.interface';
import { ResourceService } from '../services/resource.service';
import { Subject, BehaviorSubject, Subscription } from 'rxjs';
import { TileService } from '../services/tile.service';


@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent {
  public cursorPosition: IPoint = {X: 0, Y: 0};
  isCursorOnMap = false;
  private _isDialogVisible$: Subscription = new Subscription();
  public isDialogVisible = false;
  
  constructor(
    private _userInterfaceService: UserInterfaceService,
    private _resourceService: ResourceService,
    private _tileService: TileService
  ) {}

  ngOnInit() {
    this._isDialogVisible$ = this._userInterfaceService.getToggleDialog().subscribe((isActive) => {
      this.isDialogVisible = isActive;
    });

  }

  public getTileX(): number {
    return this._userInterfaceService.tilePosition.X;
  }

  public getTileY(): number {
    return this._userInterfaceService.tilePosition.Y;
  }

  public getIsOnMap(): boolean {
    return this._userInterfaceService.isCursorOnMap;
  }

  public getCursorPosition(): IPoint {
    return this.cursorPosition;
  }

  public getGold(): number {
    return this._resourceService.gold;
  }

  public getSettlers(): number {
    return this._resourceService.settlers;
  }

  closeDialog() {
    this._userInterfaceService.setToggleDialog(false);
    // this._tileService.setTileClicked(false);
  }
}
