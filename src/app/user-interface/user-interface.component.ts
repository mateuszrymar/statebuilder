import { AfterViewInit, Component } from '@angular/core';
import { UserInterfaceService } from '../services/user-interface.service';
import { IPoint } from '../models/geometry.interface';
import { ResourceService } from '../services/resource.service';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent {
  cursorPosition: IPoint = {X: 0, Y: 0};
  isCursorOnMap = false;
  
  constructor(
    private userInterfaceService: UserInterfaceService,
    private resourceService: ResourceService
  ) {}

  public getTileX(): number {
    return this.userInterfaceService.tilePosition.X;
  }

  public getTileY(): number {
    return this.userInterfaceService.tilePosition.Y;
  }

  public getIsOnMap(): boolean {
    return this.userInterfaceService.isCursorOnMap;
  }

  public getGold(): number {
    return this.resourceService.gold;
  }

  public getSettlers(): number {
    return this.resourceService.settlers;
  }
}
