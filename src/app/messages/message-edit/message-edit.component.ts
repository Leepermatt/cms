import { Component, ElementRef, EventEmitter, Output, ViewChild } from '@angular/core';
import { Message } from '../message.model';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
    @ViewChild('subject') subjectRef!: ElementRef;
  @ViewChild('msgText') msgTextRef!: ElementRef;

   @Output() addMessageEvent = new EventEmitter<Message>();

   currentSender: string = 'Matt Leeper';

     onSendMessage() {
    const subject = this.subjectRef.nativeElement.value;
    const msgText = this.msgTextRef.nativeElement.value;

        const newMessage = new Message(
      '1',               // Hardcoded ID
      subject,           // Subject from input
      msgText,           // Message text from input
      this.currentSender // Sender name
    );

    this.addMessageEvent.emit(newMessage);
     }
      onClear() {
    this.subjectRef.nativeElement.value = '';
    this.msgTextRef.nativeElement.value = '';
  }
}
