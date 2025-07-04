import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Document } from './document.model';

import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class DocumentService {

  documents: Document[] = [];
  maxDocumentId: number;

  private sortAndSend() {
  const documentsClone = this.documents.slice();
  documentsClone.sort((a, b) => a.name.localeCompare(b.name));
  this.documentListChangedEvent.next(documentsClone);
}

   documentListChangedEvent = new Subject<Document[]>();
 
   getMaxId(): number {
  let maxId = 0;

  for (const document of this.documents) {
    const currentId = parseInt(document.id);
    if (currentId > maxId) {
      maxId = currentId;
    }
  }

  return maxId;
}
constructor(private http: HttpClient) {}

getDocuments() {
  this.http
    .get<{ message: string; documents: Document[] }>('http://localhost:3000/documents')
    .subscribe((responseData) => {
      this.documents = responseData.documents;
      this.sortAndSend();
    });
}





// getDocuments(): void {
//   this.http
//     .get<Document[]>('https://cms-project-9ba20-default-rtdb.firebaseio.com/documents.json')
//     .subscribe(
//       (documents: Document[]) => {
//         this.documents = documents;
//         this.maxDocumentId = this.getMaxId();
//         this.documents.sort((a, b) => {
//           if (a.name < b.name) return -1;
//           if (a.name > b.name) return 1;
//           return 0;
//         });
//         this.documentListChangedEvent.next(this.documents.slice());
//       },
//       (error: any) => {
//         console.error('Error fetching documents:', error);
//       }
//     );
// }

  getDocument(id: string): Document | null {
    return this.documents.find(doc => doc.id === id) || null;
  }

addDocument(document: Document) {
  if (!document) return;

  document.id = '';

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http
    .post<{ message: string; document: Document }>(
      'http://localhost:3000/documents',
      document,
      { headers: headers }
    )
    .subscribe((responseData) => {
      this.documents.push(responseData.document);
      this.sortAndSend();
    });
}




//   addDocument(newDocument: Document) {
//   if (!newDocument) return;

//   this.maxDocumentId++;
//   newDocument.id = this.maxDocumentId.toString();
//   this.documents.push(newDocument);

  
//   this.storeDocuments();

// }

updateDocument(originalDocument: Document, newDocument: Document) {
  if (!originalDocument || !newDocument) return;

  const pos = this.documents.findIndex(d => d.id === originalDocument.id);
  if (pos < 0) return;

  newDocument.id = originalDocument.id;
  newDocument._id = originalDocument._id;

  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http
    .put('http://localhost:3000/documents/' + originalDocument.id, newDocument, { headers })
    .subscribe(() => {
      this.documents[pos] = newDocument;
      this.sortAndSend();
    });
}




// updateDocument(originalDocument: Document, newDocument: Document) {
//   if (!originalDocument || !newDocument) return;

//   const pos = this.documents.indexOf(originalDocument);
//   if (pos < 0) return;

//   newDocument.id = originalDocument.id;
//   this.documents[pos] = newDocument;

  
//   this.storeDocuments();
// }


// deleteDocument(document: Document) {
//   if (!document) return;

//   const pos = this.documents.indexOf(document);
//   if (pos < 0) return;

//   this.documents.splice(pos, 1);
//  this.storeDocuments();
// }

deleteDocument(document: Document) {
  if (!document) return;

  const pos = this.documents.findIndex(d => d.id === document.id);
  if (pos < 0) return;

  this.http
    .delete('http://localhost:3000/documents/' + document.id)
    .subscribe(() => {
      this.documents.splice(pos, 1);
      this.sortAndSend();
    });
}



storeDocuments(): void {
  const documentsJson = JSON.stringify(this.documents);
  const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  this.http
    .put('https://cms-project-9ba20-default-rtdb.firebaseio.com/documents.json', documentsJson, { headers })
    .subscribe(() => {
      this.documentListChangedEvent.next(this.documents.slice());
    });
}

}
