import { Component, OnInit, OnDestroy } from '@angular/core';
import { contact } from '../contact.model';
import { ContactService } from '../contact.service';
import { Subscription } from 'rxjs';

@Component({
  selector: 'cms-contact-list',
  templateUrl: './contact-list.component.html',
  styleUrls: ['./contact-list.component.css']
})
export class ContactListComponent implements OnInit, OnDestroy {
  contact: contact[] = [];
  subscription: Subscription;
  term: string;

  constructor(private contactService: ContactService) { }

  ngOnInit() {
    this.subscription = this.contactService.contactListChangedEvent.subscribe(
      (contacts: contact[]) => {
        this.contact = contacts;
      }
    );

    this.contactService.getContacts();
  }

  ngOnDestroy() {
    this.subscription.unsubscribe();
  }

  onKeyPress(value: string) {
    this.term = value;
  }

}
