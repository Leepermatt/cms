import { Injectable, EventEmitter } from '@angular/core';
import { Contact } from './contact.model';
import {MOCKCONTACTS} from './MOCKCONTACTS';
import { Subject } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class ContactService {

  contacts: Contact[] = [];
  contactChangedEvent = new EventEmitter<Contact[]>();
  
   contactSelectedEvent: EventEmitter<Contact> = new EventEmitter<Contact>();

  constructor() { 
    this.contacts = MOCKCONTACTS;
  }
 

    getContacts(): Contact[] {
    return this.contacts.slice();
  }
  getContact(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }
    deleteContact(contact: Contact) {
    if (!contact) return;
    const pos = this.contacts.indexOf(contact);
    if (pos < 0) return;
    this.contacts.splice(pos, 1);
    this.contactChangedEvent.emit(this.contacts.slice());
  }
}


