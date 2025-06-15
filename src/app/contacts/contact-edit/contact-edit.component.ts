import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Contact } from '../contact.model'; 
import { ContactService } from '../contact.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';


@Component({
  selector: 'cms-contact-edit',
  standalone: false,
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  originalContact: Contact;
  contact: Contact;
  groupContacts: Contact[] = [];
  editMode: boolean = false;
  id: string;

  constructor(
    private contactService: ContactService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    this.id = params['id'];

    if (!this.id) {
      this.editMode = false;
      return;
    }

    this.originalContact = this.contactService.getContact(this.id);

    if (!this.originalContact) {
      return;
    }

    this.editMode = true;

    // Clone the original contact
    this.contact = JSON.parse(JSON.stringify(this.originalContact));

    // If the original contact has a group, clone it too
    if (this.originalContact.group && this.originalContact.group.length > 0) {
      this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group));
    }
  });
}
onSubmit(form: NgForm): void {
  const value = form.value;

  const newContact = new Contact(
    this.originalContact?.id ?? '', // reuse ID if editing, otherwise generate later
    value.name,
    value.email,
    value.phone,
    value.imageUrl,
    this.groupContacts
  );

  if (this.editMode) {
    this.contactService.updateContact(this.originalContact, newContact);
  } else {
    this.contactService.addContact(newContact);
  }

  this.router.navigate(['/contacts']);
}
onDrop(event: CdkDragDrop<Contact[]>) {
  if (event.previousContainer === event.container) {
    moveItemInArray(this.groupContacts, event.previousIndex, event.currentIndex);
  } else {
    // optional: handle dragging from outside lists if needed
  }
}
onCancel(): void {
  this.router.navigate(['/contacts']);
}
isInvalidContact(newContact: Contact): boolean {
  // No contact provided
  if (!newContact) {
    return true;
  }

  
  if (this.contact && newContact.id === this.contact.id) {
    return true;
  }

  
  for (let i = 0; i < this.groupContacts.length; i++) {
    if (newContact.id === this.groupContacts[i].id) {
      return true;
    }
  }

  
  return false;
}
addToGroup($event: any): void {
  const selectedContact: Contact = $event.dragData;

  const invalidGroupContact = this.isInvalidContact(selectedContact);
  if (invalidGroupContact) {
    return;
  }

  this.groupContacts.push(selectedContact);
}
onRemoveItem(index: number): void {
  if (index < 0 || index >= this.groupContacts.length) {
    return;
  }
  this.groupContacts.splice(index, 1);
}
}