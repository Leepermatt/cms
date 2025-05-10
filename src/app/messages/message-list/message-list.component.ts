import { Component } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-list',
  standalone: false,
  templateUrl: './message-list.component.html',
  styleUrl: './message-list.component.css'
})
export class MessageListComponent {
    messages: Message[] = [
    new Message('1', 'Welcome', 'Thanks for joining our platform!', 'Matt Leeper'),
    new Message('2', 'Reminder', 'Don’t forget your meeting at 3 PM.', 'Jane Doe'),
    new Message('3', 'Follow-Up', 'Did you get a chance to review the documents?', 'John Smith')
  ];
  onAddMessage(message: Message) {
    this.messages.push(message);
  }
}
