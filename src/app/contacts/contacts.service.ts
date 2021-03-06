import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { Contact } from './contact.modal';

@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = [];
  selectedContact = new Subject<Contact>();
  selectedContactId = new Subject<String>();

  constructor(private _route: Router, private _router: Router) { }

  addContact(contact: Contact) {
    this.selectedContactId.next(contact.id);
    this.contacts.push(contact);
  }

  getContact(): Contact[] {
    return this.contacts;
  }

  getContactById(id: String) {
    this.selectedContactId.next(id);
    return this.contacts.find(contact => contact.id == id);
  }

  deleteContact(contactId: String) {
    let contactIndex = this.contacts.findIndex(contact => contact.id == contactId);
    this.contacts.splice(contactIndex, 1);

    if(this.contacts.length) {
      if(contactIndex == 0) {
        this.selectedContactId.next(this.contacts[contactIndex].id);
        this._route.navigateByUrl('/contacts/contact-detail/'+this.contacts[contactIndex].id); 
      } 
      else {
        this.selectedContactId.next(this.contacts[contactIndex -1].id);
        this._route.navigateByUrl('/contacts/contact-detail/'+this.contacts[contactIndex -1].id);
      } 
    } else {
      this._route.navigateByUrl('/contacts');
    }
  }

  updateContact(updatedContact:Contact) {
    let contactIndex = this.contacts.findIndex(contact => contact.id == updatedContact.id);
    this.contacts[contactIndex] = updatedContact;
    this._router.navigateByUrl('/contacts/contact-detail/' + updatedContact.id);
  }


}
