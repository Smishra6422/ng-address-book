import { Component, OnInit } from '@angular/core';
import { Contact } from './contact.modal';
import { ContactsService } from './contacts.service';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = []
  selectedContactId: String = '';
  constructor(private _contacts: ContactsService) { 
    this._contacts.selectedContactId.subscribe(id => this.selectedContactId = id);
  }

  ngOnInit(): void {
    this.contacts = this._contacts.getContact();
  }

}
