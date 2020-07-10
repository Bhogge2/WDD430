import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { ContactService } from '../contact.service';
import { contact } from '../contact.model';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'cms-contact-edit',
  templateUrl: './contact-edit.component.html',
  styleUrls: ['./contact-edit.component.css']
})
export class ContactEditComponent implements OnInit {
  editMode = false;
  originalContact: contact;
  contact: contact;
  groupContacts: contact[] = [];
  id: string;

  constructor(private contactService: ContactService, private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.route.params.subscribe((params: Params) => {
      this.id = params['id']

      if(!this.id) {
        this.editMode = false;
        return;
      }

      this.originalContact = this.contactService.getContact(this.id);
      if(!this.originalContact) {
        return;
      }

      this.editMode = true;
      this.contact = JSON.parse(JSON.stringify(this.originalContact));

      if(this.originalContact.group && this.originalContact.group.length > 0) {
        this.groupContacts = JSON.parse(JSON.stringify(this.originalContact.group))
      }
    });
  }

  onCancel() {
    this.router.navigate(['/contacts']);
  }

  onRemoveItem(index: number) {
    if(index < 0 || index>= this.groupContacts.length) {
      return;
    }

    this.groupContacts.splice(index, 1);
  }

  onSubmit(form: NgForm) {
    const value = form.value;
    const newContact = new contact(
      '',
      value.id,
      value.name,
      value.email,
      value.phone,
      value.imageUrl,
      this.groupContacts
    );

    if(this.editMode) {
      this.contactService.updateContact(this.originalContact, newContact);
    } else {
      this.contactService.addContact(newContact);
    }

    this.router.navigate(['/contacts']);
  }

  isInvalidContact(newContact: contact) {
    if (!newContact) {
      return true;
    }

    if (this.contact && newContact.id === this.contact.id) {
      return true;
    }

    for (let i= 0; i < this.groupContacts.length; i++) {
      if (newContact.id === this.groupContacts[i].id) {
        return true;
      }

      return false;
    }
  }

  addToGroup($event: any) {
    const selectedContact: contact = $event.dragData;
    const invalidGroupContact = this.isInvalidContact(selectedContact);

    if(invalidGroupContact) {
      return;
    }

    this.groupContacts.push(selectedContact);
  }

}
