import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';
import { DocumentsService } from '../documents.service'

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  document: Document[] = [];

  constructor(private documentsService: DocumentsService) { }

  ngOnInit(){
    this.documentsService.documentChangedEvent.subscribe(
      (document: Document[]) => {
        this.document = document;
      });
    this.document = this.documentsService.getDocuments();
  }

}
