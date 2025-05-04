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
    new Contact('1', 'R. Kent Jackson', '123@byui.com', '208-555-1234', 'images/barzeer.jpg', []),
    new Contact('2', 'Rex Barzee', 'barzeer@byui.edu', '208-555-5678', 'images/jacksonk.jpg', []),
  ];

}
