import { Injectable, EventEmitter } from '@angular/core';
import { contact } from './contact.model';
import { MOCKCONTACTS } from './MOCKCONTACTS';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contacts: contact[] = [];
    contactChangedEvent = new EventEmitter<contact[]>();
    
    constructor() {
        this.contacts = MOCKCONTACTS;
    }

    deleteContact(contact: contact) {
        if (!contact) {
            return;
        }

        const pos = this.contacts.indexOf(contact);
        
        if(pos < 0) {
            return;
        }

        this.contacts.splice(pos, 1);

        this.contactChangedEvent.emit(this.contacts.slice());
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