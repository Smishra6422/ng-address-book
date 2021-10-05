import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from '../contact.modal';
import { ContactsService } from '../contacts.service';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;
  constructor(
    private _contacts: ContactsService,
    private _route: ActivatedRoute, 
    private _router: Router)
    { }

  ngOnInit(): void {
    this._route.params.subscribe(param => {
      this.contact = this._contacts.getContactById(param.id);
    });
  }

  onEdit(contactId: String) {
    this._router.navigateByUrl('/contacts/edit-contact/' + contactId);
  }
  
  onDelete(contactId: String) {
    this._contacts.deleteContact(contactId);
  }

}
