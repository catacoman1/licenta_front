import { Component } from '@angular/core';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css'],
  providers: [MessageService]
})
export class ContactComponent {

  constructor(
    private messageService: MessageService
  ) {}

  showSuccess() {
    this.messageService.add({severity:'success', summary: 'Success', detail: 'Mesaj trimis cu succes!'});
  }

  showError () {
    this.messageService.add({severity:'error', summary: 'Error', detail: 'Mesajul nu a fost trimis!'});
  }


}
