import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Contact } from '../contact.model';

@Component({
  selector: 'cms-contact-item',
  standalone: false,
  templateUrl: './contact-item.component.html',
  styleUrls: ['./contact-item.component.css']
})
export class ContactItemComponent {

  @Input() contact!: Contact  ;
  @Output() contactSelected = new EventEmitter<void>();

  onClick() {
    console.log('Clicked:', this.contact); // ✅ DEBUG
    this.contactSelected.emit();

}
}