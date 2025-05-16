import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();

  documents: Document[] = [];

  ngOnInit() {
    this.documents = [
      new Document(
        '1',
        'Document A',
        'First test document',
        'http://example.com/docA.pdf',
        []
      ),
      new Document(
        '2',
        'Document B',
        'Second test document',
        'http://example.com/docB.pdf',
        []
      ),
      new Document(
        '3',
        'Document C',
        'Third test document',
        'http://example.com/docC.pdf',
        []
      ),
      new Document(
        '4',
        'Document D',
        'Fourth test document',
        'http://example.com/docD.pdf',
        []
      )
    ];
  }

  onSelectDocument(document: Document) {
    console.log('Emitting document:', document);
    this.selectedDocumentEvent.emit(document);
  }
}
