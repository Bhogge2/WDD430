import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { contact } from '../contact.model';
import { ContactService } from '../contact.service';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit {
  contact: contact[] = [];

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactChangedEvent.subscribe(
    (contact: contact[]) => {
      this.contact = contact;
    });
    this.contact = this.contactService.getContacts();
  }

}
