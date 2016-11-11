import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule, JsonpModule  } from '@angular/http';
//He agregado JsonpModule  en casa, 11nov16

import { AppComponent } from './app.component';
import { PeliculasUiComponent } from './peliculas-ui/peliculas-ui.component';

@NgModule({
  declarations: [
    AppComponent,
    PeliculasUiComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    JsonpModule 
  ],
  providers: [],
  //bootstrap: [AppComponent, PeliculasUiComponent]
  bootstrap: [PeliculasUiComponent]
})
export class AppModule { }
