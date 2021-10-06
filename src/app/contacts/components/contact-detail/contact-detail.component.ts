import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService, Contact } from '../../../contacts';

@Component({
  selector: 'app-contact-detail',
  templateUrl: './contact-detail.component.html'
})
export class ContactDetailComponent implements OnInit {
  contact: Contact | undefined;
  constructor(
    private contactsService: ContactsService,
    private activatedRoute: ActivatedRoute, 
    private router: Router)
    { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(param => {
      this.contact = this.contactsService.getContactById(param.id);
    });
  }

  onEdit(contactId: String) {
    this.router.navigateByUrl('/contacts/edit-contact/' + contactId);
  }
  
  onDelete(contactId: String) {
    this.contactsService.deleteContact(contactId);
  }

}
