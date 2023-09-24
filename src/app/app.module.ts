import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MapComponent } from './components/map/map.component';
import { UserInterfaceComponent } from './components/user-interface/user-interface.component';
import { LineComponent } from './components/line/line.component';
import { TileComponent } from './components/tile/tile.component';
import { BuildDialogComponent } from './components/build-dialog/build-dialog.component';
import { SettlementsComponent } from './components/settlements/settlements.component';
import { RoadsComponent } from './components/roads/roads.component';

@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    UserInterfaceComponent,
    LineComponent,
    TileComponent,
    BuildDialogComponent,
    SettlementsComponent,
    RoadsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
