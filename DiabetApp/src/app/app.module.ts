import { NgModule, Component } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './Components/home/home.component';
import { NavBarComponent } from './Components/nav-bar/nav-bar.component';
import { ReteteComponent } from './Components/retete/retete.component'
import { DespreComponent } from './Components/despre/despre.component'
import { RaportGlicemieComponent } from './Components/raport-glicemie/raport-glicemie.component';
import { ContactComponent } from './Components/contact/contact.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';
import { FooterComponent } from './Components/footer/footer/footer.component';
import { CardComponent } from './Components/card/card.component';
import { UserMenuComponent } from './Components/user-menu/user-menu.component';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavBarComponent,
    ReteteComponent,
    DespreComponent,
    RaportGlicemieComponent,
    ContactComponent,
    LoginComponent,
    SignupComponent,
    FooterComponent,
    CardComponent,
    UserMenuComponent
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
