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
      this.contactsService.getContactById(param.id).subscribe(data => {
        this.contact = data;
      }, error => {
        alert('some error occured');
        this.router.navigateByUrl('/contacts');
      });
    });
  }

  onEdit(contactId: String) {
    this.router.navigateByUrl('/contacts/edit-contact/' + contactId);
  }
  
  onDelete(contactId: String) {
    this.contactsService.deleteContact(contactId).subscribe(data => {
      this.router.navigateByUrl('/contacts');

      this.contactsService.selectedContactId.next('');
      this.contactsService.reloadContacts.next(true);
    }, error => {
        alert('some error occured');
    }
    );
  }

}
