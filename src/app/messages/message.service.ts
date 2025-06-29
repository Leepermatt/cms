import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Message } from './message.model';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class MessageService {
  messages: Message[] = [];
  maxMessageId: number = 0;

  messageChangedEvent: Subject<Message[]> = new Subject<Message[]>();

  constructor(private http: HttpClient) {}

  getMaxId(): number {
    let maxId = 0;
    for (const message of this.messages) {
      const currentId = parseInt(message.id);
      if (currentId > maxId) {
        maxId = currentId;
      }
    }
    return maxId;
  }

getMessages(): void {
  this.http
    .get<{ [key: string]: Message }>('https://cms-project-9ba20-default-rtdb.firebaseio.com/messages.json')
    .subscribe(
      (responseData) => {
        const messages: Message[] = [];

        for (const key in responseData) {
          if (responseData.hasOwnProperty(key)) {
            const msg = responseData[key];
            // Fix malformed or missing fields if necessary
            if (msg && msg.id && msg.subject && msg.msgText && msg.sender) {
              messages.push({ ...msg });
            }
          }
        }

        this.messages = messages;
        this.maxMessageId = this.getMaxId();
        this.messages.sort((a, b) => a.subject.localeCompare(b.subject));
        this.messageChangedEvent.next(this.messages.slice());
      },
      (error: any) => {
        console.error('Error fetching messages:', error);
      }
    );
}
  getMessage(id: string): Message | null {
    for (let message of this.messages) {
      if (message.id === id) {
        return message;
      }
    }
    return null;
  }

  addMessage(message: Message): void {
    if (!message) return;

    this.maxMessageId++;
    message.id = this.maxMessageId.toString();
    this.messages.push(message);
    this.storeMessages();
  }

  storeMessages(): void {
    const messagesJson = JSON.stringify(this.messages);
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http
      .put('https://cms-project-9ba20-default-rtdb.firebaseio.com/messages.json', messagesJson, { headers })
      .subscribe(() => {
        this.messageChangedEvent.next(this.messages.slice());
      });
  }
}
