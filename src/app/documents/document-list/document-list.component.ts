import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Document } from '../document.model';

@Component({
  selector: 'cms-document-list',
  templateUrl: './document-list.component.html',
  styleUrls: ['./document-list.component.css']
})
export class DocumentListComponent implements OnInit {
  @Output() selectedDocumentEvent = new EventEmitter<Document>();
  document: Document[] = [
    new Document('1', 'Document 1', 'Document Description 1','documentURL@byui.edu', null),
    new Document('2', 'Document 2', 'Document Description 2','documentURL2@byui.edu', null)
  ];

  constructor() { }

  ngOnInit(): void {
  }
  
  onSelected(document: Document) {
    this.selectedDocumentEvent.emit(document);
  }

}
