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
    
  }

  ngOnInit() {
        

this.subscription = this.documentService.documentListChangedEvent
  .subscribe((updatedDocuments: Document[]) => {
    this.documents = updatedDocuments;
  });
  this.documentService.getDocuments();

  }
  ngOnDestroy() {
  this.subscription.unsubscribe();
}
}