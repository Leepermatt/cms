import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Contact } from './contact.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ContactService {
  contacts: Contact[] = [];
  maxContactId: number = 0;

  contactListChangedEvent = new Subject<Contact[]>();

  constructor(private http: HttpClient) {}

  getContacts(): void {
    this.http
      .get<{ message: string; contacts: Contact[] }>('http://localhost:3000/contacts')
      .subscribe(
        (responseData) => {
          this.contacts = responseData.contacts;
          this.contacts.sort((a, b) => a.name.localeCompare(b.name));
          this.contactListChangedEvent.next(this.contacts.slice());
        },
        (error: any) => {
          console.error('Error fetching contacts:', error);
        }
      );
  }

  getContact(id: string): Contact | undefined {
    return this.contacts.find(contact => contact.id === id);
  }

  addContact(contact: Contact) {
    if (!contact) return;

    contact.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .post<{ message: string; contact: Contact }>(
        'http://localhost:3000/contacts',
        contact,
        { headers }
      )
      .subscribe((responseData) => {
        this.contacts.push(responseData.contact);
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  updateContact(originalContact: Contact, newContact: Contact) {
    if (!originalContact || !newContact) return;

    const pos = this.contacts.findIndex(c => c.id === originalContact.id);
    if (pos < 0) return;

    newContact.id = originalContact.id;
    newContact._id = originalContact._id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put(`http://localhost:3000/contacts/${originalContact.id}`, newContact, { headers })
      .subscribe(() => {
        this.contacts[pos] = newContact;
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }

  deleteContact(contact: Contact) {
    if (!contact) return;

    const pos = this.contacts.findIndex(c => c.id === contact.id);
    if (pos < 0) return;

    this.http
      .delete(`http://localhost:3000/contacts/${contact.id}`)
      .subscribe(() => {
        this.contacts.splice(pos, 1);
        this.contacts.sort((a, b) => a.name.localeCompare(b.name));
        this.contactListChangedEvent.next(this.contacts.slice());
      });
  }
}
