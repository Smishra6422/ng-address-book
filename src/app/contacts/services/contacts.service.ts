import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Contact } from '../model';


@Injectable({
  providedIn: 'root'
})
export class ContactsService {

  contacts: Contact[] = [];
  selectedContact = new Subject<Contact>();
  selectedContactId = new Subject<String>();
  reloadContacts = new Subject<Boolean>();
  isLoading = new Subject<Boolean>();

  constructor(private http: HttpClient) { }

  addContact(contact: Contact): Observable<any> {
    return this.http.post('https://crudcrud.com/api/e97fbf8bb78b4527aa95003d77520483/address-book', contact);
  }

  getContact(): Observable<any> {
    return this.http.get('https://crudcrud.com/api/e97fbf8bb78b4527aa95003d77520483/address-book');
  }

  getContactById(id: String): Observable<any> {
    return this.http.get('https://crudcrud.com/api/e97fbf8bb78b4527aa95003d77520483/address-book/'+ id);
  }

  deleteContact(contactId: String) {
    return this.http.delete('https://crudcrud.com/api/e97fbf8bb78b4527aa95003d77520483/address-book/'+ contactId);
  }

  updateContact(id:String, updatedContact:Contact) {
    return this.http.put('https://crudcrud.com/api/e97fbf8bb78b4527aa95003d77520483/address-book/'+ id, updatedContact);
  }


}
