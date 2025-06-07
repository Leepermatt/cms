import { Component, OnInit } from '@angular/core';
import { Contact } from '../contacts/contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  standalone: false,
  templateUrl: './contacts.component.html',
  styleUrl: './contacts.component.css'
})
export class ContactsComponent implements OnInit {
  selectedContact: Contact | null = null;

  constructor(private contactService: ContactService) {}

  ngOnInit(): void {


  }
}
