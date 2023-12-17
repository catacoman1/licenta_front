import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ReteteComponent } from './Components/retete/retete.component';
import { ContactComponent } from './Components/contact/contact.component';
import { DespreComponent } from './Components/despre/despre.component';
import { RaportGlicemieComponent } from './Components/raport-glicemie/raport-glicemie.component';
import { HomeComponent } from './Components/home/home.component';
import { LoginComponent } from './Components/login/login.component';
import { SignupComponent } from './Components/signup/signup.component';

const routes: Routes = [
  {path : "Retete", component: ReteteComponent},
  {path: "Contact", component: ContactComponent},
  {path: "Despre", component: DespreComponent},
  {path: "RaportGlicemie", component:RaportGlicemieComponent},
  {path: "Home", component:HomeComponent},
  {path: "Login", component:LoginComponent},
  {path: "Signup", component:SignupComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
