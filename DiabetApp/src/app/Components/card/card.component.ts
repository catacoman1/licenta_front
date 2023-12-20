import { Component, Input } from '@angular/core';
import { menu } from 'src/app/Models/Menu/menu';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  @Input() menu?: menu ; 
}
  
