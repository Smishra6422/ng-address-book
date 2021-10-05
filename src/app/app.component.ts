import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Contact } from './contacts/contact.modal';
import { ContactsService } from './contacts/contacts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  contacts: Contact[];
  constructor(private _router: Router, private _contacts: ContactsService){}

  ngOnInit(): void {
    this.contacts = this._contacts.contacts;
  }
  openContactForm() {
    this._router.navigateByUrl('/contacts/add-contact');
  }
}
