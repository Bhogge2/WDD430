import { Component, OnInit } from '@angular/core';
import { contact } from '../contact.model';

@Component({
  selector: 'cms-contacts-detail',
  templateUrl: './contacts-detail.component.html',
  styleUrls: ['./contacts-detail.component.css']
})
export class ContactsDetailComponent implements OnInit {
  contact: contact = new contact('2', 'Bro. Barzee','barzeer@byui.edu','208-496-3768','https://web.byui.edu/Directory/Employee/barzeer.jpg', null);
  
  constructor() { }

  ngOnInit(): void {
  }

}
