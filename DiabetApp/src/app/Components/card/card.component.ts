import { Component, Input } from '@angular/core';
import { menu } from 'src/app/Models/Menu/menu';
import { trigger, state, style, transition, animate } from '@angular/animations';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: [
    trigger('dropdown', [
      state('closed', style({
        height: '0',
        overflow: 'hidden',
        opacity: '0',
      })),
      state('open', style({
        height: '*', // Use an asterisk to compute the height automatically
        overflow: 'hidden',
        opacity: '1',
      })),
      transition('closed <=> open', animate('500ms ease-in-out')), // Adjust timing to your liking
    ])
  ]
})
export class CardComponent {
  @Input() menu?: menu ; 

  showIngredients = false; 

  constructor() {}

  
  toggleIngredients(): void {
    this.showIngredients = !this.showIngredients;
  }
  
}
  
