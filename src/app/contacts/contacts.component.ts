import { Component, OnInit } from '@angular/core';
import { ContactsService, Contact } from '../contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit {
  contacts: Contact[] = [];
  selectedContactId: String = '';
  
  constructor(private contactsService: ContactsService) { 
  }
  
  ngOnInit(): void {
    this.contactsService.selectedContactId.subscribe((id: String) => this.selectedContactId = id);
    this.contacts = this.contactsService.getContact();
  }

}
