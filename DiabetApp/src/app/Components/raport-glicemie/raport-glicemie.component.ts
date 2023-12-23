import { Component } from '@angular/core';

@Component({
  selector: 'app-raport-glicemie',
  templateUrl: './raport-glicemie.component.html',
  styleUrls: ['./raport-glicemie.component.css']
})
export class RaportGlicemieComponent {
  public data: Object[];
  constructor()
  {
    this.data=[
      { month: "Jan", glicemie:200},
      { month: "Feb", glicemie:210},
      { month: "Mar", glicemie:190},
      { month: "Apr", glicemie:185},
      { month: "May", glicemie:230},
      { month: "Jun", glicemie:240},
      { month: "Jul", glicemie:225},
      { month: "Aug", glicemie:230},
      { month: "Sep", glicemie:210},
      { month: "Oct", glicemie:200},
      { month: "Nov", glicemie:190},
      { month: "Dec", glicemie:200}
      
    ];

  }

}
