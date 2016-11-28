import {MaterialModule} from '@angular/material';
import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';
import {FormsModule} from '@angular/forms';
import {HttpModule} from '@angular/http';

import {AppComponent} from './app.component';
import {MyMapComponent} from './my-map/my-map.component';
import {PositionService} from './my-map/positon/position.service';

@NgModule({
  declarations: [
    AppComponent,
    MyMapComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    MaterialModule.forRoot()
  ],
  providers: [PositionService],
  bootstrap: [AppComponent]
})
export class AppModule {
}
