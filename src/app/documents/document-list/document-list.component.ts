import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Document } from '../document.model';
import { DocumentService } from '../document.service'; 


@Component({
  selector: 'cms-document-list',
  standalone: false,
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {

  documents: Document[] = [];
subscription: Subscription;


  constructor(private documentService: DocumentService) {
    this.documents = this.documentService.getDocuments();
  }

  ngOnInit() {
        this.documents = this.documentService.getDocuments();

this.subscription = this.documentService.documentListChangedEvent
  .subscribe((updatedDocuments: Document[]) => {
    this.documents = updatedDocuments;
  });

  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
}
}