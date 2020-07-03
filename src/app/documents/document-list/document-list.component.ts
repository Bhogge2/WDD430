import { Component, OnInit, OnDestroy } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service'
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit, OnDestroy {
  document: Document[] = [];
  subscription: Subscription;

  constructor(private documentsService: DocumentsService) { }

  ngOnInit(){
    this.subscription = this.documentsService.documentListChangedEvent.subscribe(
      (document: Document[]) => {
        this.document = document;
      });
    this.document = this.documentsService.getDocuments();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

}
