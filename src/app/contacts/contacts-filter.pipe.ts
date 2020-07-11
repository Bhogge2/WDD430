import { Pipe, PipeTransform } from '@angular/core';
import { contact } from './contact.model';


@Pipe({
  name: 'contactsFilter',
  pure: false
})
export class ContactsFilterPipe implements PipeTransform {

  transform(contacts: contact[], term: string): any {
    let filteredArray: contact[] = [];

    if (term && term.length > 0) {

      filteredArray = contacts.filter(
        (contact: contact) => contact.name.toLowerCase().includes(term.toLowerCase())
      );
    }

      if (filteredArray.length < 1) {
        return contacts;
      }

      return filteredArray;
    }

}
