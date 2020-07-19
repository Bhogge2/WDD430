import { Injectable } from '@angular/core';
import { Document } from './document.model';
import { Subject } from 'rxjs';
import { HttpHeaders, HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DocumentsService {
  documents: Document[] = [];
  documentListChangedEvent = new Subject<Document[]>();
  maxDocumentId: number;

  constructor(private http: HttpClient) {
  }

  addDocument(document: Document) {
    if (!document) {
      return;
    }

    document.id = '';

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.post<{ message: string, document: Document }>('http://localhost:3000/documents', document, { headers: headers })
      .subscribe(
        (responseData) => {
          document.id = responseData.document.id;
          this.documents.push(responseData.document);
          this.sortAndSend();
        }
      )
  }

  deleteDocument(document: Document) {
    if (!document) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === document.id);

    if (pos < 0) {
      return;
    }

    console.log(pos);
    

    this.http.delete('http://localhost:3000/documents/' + document.id)
      .subscribe(
        (response: Response) => {
          this.documents.splice(pos, 1);
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
          // console.log("IDK what happened");
        }
      )

  }

  getDocument(id: string): Document {
    for (const document of this.documents) {
      if (document.id === id) {
        return document;
      }
    }
    return null;
  }

  getDocuments() {
    this.http.get<{ message: string, documents: Document[] }>('http://localhost:3000/documents')
      .subscribe(
        (documentData) => {
          this.documents = documentData.documents;
          this.sortAndSend();
        },
        (error: any) => {
          console.log(error);
        }
      );
  }

  //  getMaxId(): number {
  //    let maxId = 0;
  //    for(const document of this.documents) {
  //      let currentId = parseInt(document.id);

  //      if(currentId > maxId) {
  //        maxId = currentId;
  //      }
  //    }

  //    return maxId;
  //  }

  //  storeDocuments() {
  //    let documents = JSON.stringify(this.documents);

  //    const headers = new HttpHeaders({'Content-Type': 'application/json'});

  //    this.http.put('https://wdd430-cf3dc.firebaseio.com/documents.json', documents, {headers: headers})
  //    .subscribe(
  //      () => {
  //        this.documentListChangedEvent.next(this.documents.slice());
  //      }
  //    )
  //  }

  updateDocument(originalDocument: Document, newDocument: Document) {
    if (!originalDocument || !newDocument) {
      return;
    }

    const pos = this.documents.findIndex(d => d.id === originalDocument.id);

    if (pos < 0) {
      return;
    }

    newDocument.id = originalDocument.id;

    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

    this.http.put('http://localhost:3000/documents/' + originalDocument.id, newDocument, { headers: headers })
      .subscribe(
        (response: Response) => {
          this.documents[pos] = newDocument;
          this.sortAndSend();
        }
      )

  }

  sortAndSend() {
    this.documents.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
    this.documentListChangedEvent.next(this.documents.slice());
  }
}
