import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { contact } from './contact.model';
import { Subject } from 'rxjs';
import { stringify } from 'querystring';

@Injectable({
    providedIn: 'root'
})
export class ContactService {
    contacts: contact[] = [];
    contactListChangedEvent = new Subject<contact[]>();
    maxContactId: number;

    constructor(private http: HttpClient) {
    }

    addContact(newContact: contact) {
        if (!newContact) {
            return;
        }

        newContact.id = '';

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });

        this.http.post<{ message: string, contact: contact }>('http://localhost:3000/contacts', contact,
            { headers: headers })
            .subscribe(
                (responseData) => {
                    this.contacts.push(responseData.contact);
                    this.sortAndSend();
                }
            )
    }

    deleteContact(contact: contact) {
        if (!contact) {
            return;
        }

        const pos = this.contacts.findIndex(c => c.id === contact.id);

        if (pos < 0) {
            return;
        }

        this.http.delete('http://localhost:3000/contacts/' + contact.id)
            .subscribe(
                (response: Response) => {
                    this.contacts.splice(pos, 1);
                    this.sortAndSend();
                }
            )
    }

    getContact(id: string) {
        // for (const contact of this.contacts) {
        //     if (contact.id === id) {
        //       return contact;
        //     }
        //   }
        //   return null;
        //console.log(this.http.get<{ message: string, contact: contact }>('http://localhost:3000/contacts/' + id));
        return this.http.get<{ message: string, contact: contact }>('http://localhost:3000/contacts/' + id);
    }

    getContactTwo(id: string) {
        for (const contact of this.contacts) {
            if (contact.id === id) {
              return contact;
            }
          }
          return null;

    }

    getContacts() {
        this.http.get<{ message: string, contacts: contact[] }>('http://localhost:3000/contacts')
            .subscribe(
                (responseData) => {
                    this.contacts = responseData.contacts;
                    this.sortAndSend();
                },
                (error: any) => {
                    console.log(error);
                }
            );
    }

    sortAndSend() {
        this.contacts.sort((a, b) => a.name > b.name ? 1 : b.name > a.name ? -1 : 0);
        this.contactListChangedEvent.next(this.contacts.slice());
    }

    // getMaxId(): number {
    //     let maxId = 0;

    //     for (const contact of this.contacts) {
    //         let currentId = parseInt(contact.id);

    //         if (currentId > maxId) {
    //             maxId = currentId;
    //         }
    //     }

    //     return maxId;
    // }

    // storeContacts() {
    //     let contacts = JSON.stringify(this.contacts);
    //     const headers = new HttpHeaders({ "Content-Type": "application/json" });

    //     this.http.put('https://wdd430-cf3dc.firebaseio.com/contacts.json', contacts, { headers: headers })
    //         .subscribe(
    //             () => {
    //                 this.contactListChangedEvent.next(this.contacts.slice());
    //             }
    //         )
    // }

    updateContact(originalContact: contact, newContact: contact) {
        if (!originalContact || !newContact) {
            return;
        }

        const pos = this.contacts.findIndex(c => c.id === originalContact.id);

        if (pos < 0) {
            return;
        }

        const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
        
        newContact.id = originalContact.id;

        this.http.patch('http://localhost:3000/contacts/' + originalContact.id, newContact, {headers: headers})
        .subscribe(
            (response: Response) => {
                this.contacts[pos] = newContact;
                this.sortAndSend();
            }
        )
    }
}