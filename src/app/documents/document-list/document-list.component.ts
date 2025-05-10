import { Component, OnInit } from '@angular/core';
import { Document } from '../document.model';
@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrl: './document-list.component.css'
})
export class DocumentListComponent implements OnInit {
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
      )
    ];
  }
}
