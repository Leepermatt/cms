import { Contact } from '../contacts/contact.model';

export class Message {
  constructor(
    public id: string,
    public subject: string,
    public msgText: string,
    public sender: string | Contact  // now expects a Contact object
  ) {}
}
