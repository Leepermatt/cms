import { Component } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-list',
  standalone: false,
  templateUrl: './contact-list.component.html',
  styleUrl: './contact-list.component.css'
})
export class ContactListComponent {
  contacts: Contact[] = [
    new Contact('1', 'John Doe', '123@byui.com', '208-555-1234', 'https://www.w3schools.com/howto/img_avatar.png', []),
    new Contact('2', 'Jane Smith', 'barzeer@byui,edu', '208-555-5678', 'https://www.w3schools.com/howto/img_avatar.png', []),
  ];
  

}
