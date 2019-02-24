import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import { NgxMdModule } from 'libs/ngx-md/src/lib/ngx-md.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    NgxMdModule.forRoot(),
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
