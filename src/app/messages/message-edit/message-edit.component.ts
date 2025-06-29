import { Component, ElementRef, ViewChild } from '@angular/core';
import { Message } from '../message.model';
import { MessageService } from '../message.service';

@Component({
  selector: 'cms-message-edit',
  standalone: false,
  templateUrl: './message-edit.component.html',
  styleUrl: './message-edit.component.css'
})
export class MessageEditComponent {
  @ViewChild('subjectInput', { static: false }) subjectInputRef: ElementRef;
  @ViewChild('msgTextInput', { static: false }) msgTextInputRef: ElementRef;

  constructor(private messageService: MessageService) {}

  onSendMessage(): void {
    const subject = this.subjectInputRef.nativeElement.value.trim();
    const text = this.msgTextInputRef.nativeElement.value.trim();

    if (!subject || !text) return;

    const newMessage = new Message(
      '',         // id (assigned by service)
      subject,    // subject
      text,       // msgText
      'Admin'     // sender (can be replaced with actual user)
    );

    this.messageService.addMessage(newMessage);
    this.onClear();
  }

  onClear(): void {
    this.subjectInputRef.nativeElement.value = '';
    this.msgTextInputRef.nativeElement.value = '';
  }
}
