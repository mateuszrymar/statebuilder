import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './map/map.component';
import { UserInterfaceComponent } from './user-interface/user-interface.component';
import { LineComponent } from './line/line.component';
import { TileComponent } from './tile/tile.component';
import { BuildDialogComponent } from './build-dialog/build-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UserInterfaceComponent,
    LineComponent,
    TileComponent,
    BuildDialogComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
