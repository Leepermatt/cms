import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  constructor(private messageService: MessageService) {}

  onSendMessage(msgInput: HTMLInputElement): void {
    const newMessage = new Message(
      '99',
      msgInput.value,
      'test',
      new Date().toISOString()
    );

    this.messageService.addMessage(newMessage);
    msgInput.value = '';
  }
  onClear(): void {
  // Optional: you can access elements by template ref variables passed in as well
}

}
