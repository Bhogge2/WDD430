import { Injectable, EventEmitter } from '@angular/core';
import { contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contacts: contact[] = [];
    contactSelectedEvent = new EventEmitter<contact>();
    
    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    getContact(id: string): contact {
        for(const contact of this.contacts) {
            if(contact.id === id) {
                return contact;
            }
        }
        return null;
    }

    getContacts(): contact[] {
        return this.contacts.slice();
    }
}