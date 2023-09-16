import { AfterViewInit, Component } from '@angular/core';
import { UserInterfaceService } from '../services/user-interface.service';
import { IPoint } from '../models/geometry.interface';

@Component({
  selector: 'app-user-interface',
  templateUrl: './user-interface.component.html',
  styleUrls: ['./user-interface.component.scss']
})
export class UserInterfaceComponent {
  cursorPosition: IPoint = {X: 0, Y: 0};
  isCursorOnMap = false;
  
  constructor(private userInterfaceService: UserInterfaceService) {}

  public getCursorX(): number {
    return this.userInterfaceService.cursorPosition.X;
  }

  public getCursorY(): number {
    return this.userInterfaceService.cursorPosition.Y;
  }

  public getTileX(): number {
    return this.userInterfaceService.tilePosition.X;
  }

  public getTileY(): number {
    return this.userInterfaceService.tilePosition.Y;
  }

  public getIsOnMap(): boolean {
    return this.userInterfaceService.isCursorOnMap;
  }
}
