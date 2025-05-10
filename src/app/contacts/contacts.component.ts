import { Component } from '@angular/core';
import { Contact } from '../contacts/contact.model';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent {

  selectedContact: Contact | null = null;
  
  onContactSelected(contact: Contact) {
    console.log('Selected contact:', contact);
    this.selectedContact = contact;
  }

}
