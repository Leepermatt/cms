import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];

  messageChangedEvent: Subject<Message[]> = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMessages(): void {
    this.http
      .get<{ message: string; messages: Message[] }>('http://localhost:3000/messages')
      .subscribe(
        (responseData) => {
          this.messages = responseData.messages;
          this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
          this.messageChangedEvent.next(this.messages.slice());
        },
        (error: any) => {
          console.error('Error fetching messages:', error);
        }
      );
  }

  getMessage(id: string): Message | null {
    return this.messages.find((msg) => msg.id === id) || null;
  }

  addMessage(message: Message): void {
    if (!message) return;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    message.id = ''; // ensure backend assigns the ID

this.http
  .post<{ message: string; createdMessage: Message }>(
    'http://localhost:3000/messages',
    message,
    { headers }
  )
  .subscribe((responseData) => {
    this.messages.push(responseData.createdMessage);
    this.messageChangedEvent.next(this.messages.slice());
  });
  }

  updateMessage(originalMessage: Message, newMessage: Message): void {
    if (!originalMessage || !newMessage) return;

    const pos = this.messages.findIndex((msg) => msg.id === originalMessage.id);
    if (pos < 0) return;

    newMessage.id = originalMessage.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('http://localhost:3000/messages/' + originalMessage.id, newMessage, { headers })
      .subscribe(() => {
        this.messages[pos] = newMessage;
        this.messageChangedEvent.next(this.messages.slice());
      });
  }

  deleteMessage(message: Message): void {
    if (!message) return;

    const pos = this.messages.findIndex((msg) => msg.id === message.id);
    if (pos < 0) return;

    this.http
      .delete('http://localhost:3000/messages/' + message.id)
      .subscribe(() => {
        this.messages.splice(pos, 1);
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
