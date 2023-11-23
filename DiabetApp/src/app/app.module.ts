import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { ReteteComponent } from './Components/retete/retete.component'
import { DespreComponent } from './Components/despre/despre.component'
import { RaportGlicemieComponent } from './Components/raport-glicemie/raport-glicemie.component';
import { ContactComponent } from './Components/contact/contact.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ReteteComponent,
    DespreComponent,
    RaportGlicemieComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
