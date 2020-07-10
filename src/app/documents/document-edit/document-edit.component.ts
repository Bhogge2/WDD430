import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { DocumentsService } from '../documents.service';
import { Document } from '../document.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-document-edit',
  templateUrl: './document-edit.component.html',
  styleUrls: ['./document-edit.component.css']
})
export class DocumentEditComponent implements OnInit {
  id: string;
  editMode:boolean = false;
  originalDocument: Document;
  Document: Document;
  childrenDocuments: Document[] = [];

  constructor(private documentService: DocumentsService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']

      if(!this.id) {
        this.editMode = false;
        return;
      }

      this.originalDocument = this.documentService.getDocument(this.id);
      if(!this.originalDocument) {
        return;
      }

      this.editMode = true;
      this.Document = JSON.parse(JSON.stringify(this.originalDocument));

    });
  }

  onCancel() {
    this.router.navigate(['/documents']);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newDocument = new Document(
      value.id,
      value.name,
      value.description,
      value.url,
      this.childrenDocuments
    );



    if(this.editMode) {
      this.documentService.updateDocument(this.originalDocument, newDocument);
    } else {
      this.documentService.addDocument(newDocument);
    }

    this.router.navigate(['/documents']);
  }

  isInvalidContact(newDocument: Document) {
    if (!newDocument) {
      return true;
    }

    if (this.Document && newDocument.id === this.Document.id) {
      return true;
    }
  }


}
