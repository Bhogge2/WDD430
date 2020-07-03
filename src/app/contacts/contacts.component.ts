import { Component, OnInit } from '@angular/core';
import { contact } from './contact.model';
import { ContactService } from './contact.service';

@Component({
  selector: 'cms-contacts',
  templateUrl: './contacts.component.html',
  styleUrls: ['./contacts.component.css']
})
export class ContactsComponent implements OnInit {
  // selectedContact: contact;
  contact: contact[];
  
  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.contactService.contactListChangedEvent.subscribe(
      (contacts: contact[]) => {
        // this.selectedContact = contact;
        this.contact = contacts;
      }
    )
  }

}
