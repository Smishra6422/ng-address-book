import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ContactsService, Contact } from './contacts';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html'
})
export class AppComponent implements OnInit {
  contacts: Contact[];
  constructor(private router: Router, private contactsService: ContactsService){}

  ngOnInit(): void {
    this.contacts = this.contactsService.contacts;
  }
  openContactForm() {
    this.router.navigateByUrl('/contacts/add-contact');
  }
}
