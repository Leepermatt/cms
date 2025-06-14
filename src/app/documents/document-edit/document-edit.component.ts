import { Component, ViewChild, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-edit',
  standalone: false,
  templateUrl: './document-edit.component.html',
  styleUrl: './document-edit.component.css'
})
export class DocumentEditComponent implements OnInit {
  originalDocument: Document;
  document: Document;
  editMode: boolean = false;
  @ViewChild('documentForm') documentForm!: NgForm;


    ngOnInit(): void {
this.document = new Document('', '', '', '', []);
  }
    onSubmit(form: NgForm): void {
    if (form.invalid) return;
    }
    onCancel(): void {
    this.document = new Document('', '', '', '', []);
  }
}
