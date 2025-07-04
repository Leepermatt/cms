import { Component, Input, OnInit } from '@angular/core';
import { Message } from '../message.model';
import { Contact } from '../../contacts/contact.model';
import { ContactService } from '../../contacts/contact.service';

@Component({
  selector: 'cms-message-item',
  standalone: false,
  templateUrl: './message-item.component.html',
  styleUrl: './message-item.component.css'
})
export class MessageItemComponent implements OnInit {
  @Input() message!: Message;
  messageSender: string = '';

  constructor(private contactService: ContactService) {}

ngOnInit(): void {
  if (typeof this.message.sender === 'string') {
    const contact: Contact | null = this.contactService.getContact(this.message.sender);
    this.messageSender = contact ? contact.name : 'Unknown Sender';
  } else if (this.message.sender && typeof this.message.sender === 'object') {
    this.messageSender = this.message.sender.name;
  } else {
    this.messageSender = 'Unknown Sender';
  }
}
}
