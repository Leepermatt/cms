import { Component,  OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Document } from '../document.model';
import { ActivatedRoute, Router, Params } from '@angular/router';
import { DocumentService } from '../document.service';

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
  
  constructor(
  private documentService: DocumentService,
  private router: Router,
  private route: ActivatedRoute
) {}


ngOnInit(): void {
  this.route.params.subscribe((params: Params) => {
    const id = params['id'];

    if (!id) {
      this.editMode = false;

      // 🔧 Initialize document with null values so required validation works
      this.document = new Document(null, null, null, null, []);
      return;
    }

    this.originalDocument = this.documentService.getDocument(id);

    if (!this.originalDocument) {
      return;
    }

    this.editMode = true;

    // 🔁 Clone the original document for editing
    this.document = JSON.parse(JSON.stringify(this.originalDocument));
  });
}
onSubmit(form: NgForm): void {
  const value = form.value;

  const newDocument = new Document(
    this.originalDocument?.id ?? '', // use original id if editing
    value.name,
    value.description,
    value.url,
    this.originalDocument?.children ?? [] // preserve children if editing
  );

  if (this.editMode) {
    this.documentService.updateDocument(this.originalDocument, newDocument);
  } else {
    this.documentService.addDocument(newDocument);
  }

  this.router.navigate(['/documents']);
}
onCancel(): void {
  this.router.navigate(['/documents']);
}
}
