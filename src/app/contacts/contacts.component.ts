import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';
import { Subscription } from 'rxjs';
import { ContactsService, Contact } from '../contacts';

@Component({
  selector: 'app-contacts',
  templateUrl: './contacts.component.html'
})
export class ContactsComponent implements OnInit, OnDestroy {
  contacts: Contact[] = [];
  selectedContactId: String = '';
  selectedContactIdObs: Subscription;
  reloadContactsObs: Subscription;
  isLoadingObs: Subscription;
  isLoading: Boolean;
  
  constructor(private spinner: NgxSpinnerService, private contactsService: ContactsService, private activatedRoute: ActivatedRoute, private router: Router,) { 
  }
  
  ngOnInit(): void {
    this.spinner.show();

    this.contactsService.isLoading.subscribe(data => {
      console.log(data);
      this.isLoading = data
    });
    
    this.contactsService.isLoading.next(true);

    this.selectedContactIdObs = this.contactsService.selectedContactId.subscribe((id: String) => this.selectedContactId = id);

    this.contactsService.getContact().subscribe(data => {
      this.contacts = data;
      this.contactsService.isLoading.next(false);
    },error => {
      this.contactsService.isLoading.next(false);
    });

    this.reloadContactsObs = this.contactsService.reloadContacts.subscribe(isReload => {
      if(isReload) {
        this.contactsService.isLoading.next(true);
        this.contactsService.getContact().subscribe(data => {
          this.contacts = data;
          this.contactsService.isLoading.next(false);
        },error => {
          this.contactsService.isLoading.next(false);
        });
      }
    })

  }

  onSelectContact(contactId: String) {
    this.contactsService.selectedContactId.next(contactId);
    this.router.navigateByUrl('/contacts/contact-detail/'+contactId);
  }

  ngOnDestroy() {
    this.selectedContactIdObs.unsubscribe();
    this.reloadContactsObs.unsubscribe();
    this.isLoadingObs.unsubscribe();
  }



}
