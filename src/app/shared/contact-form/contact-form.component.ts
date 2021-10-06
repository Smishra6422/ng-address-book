import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ContactsService, Contact } from '../../contacts';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditableContact: boolean = false;
  contact: Contact;
  idFormSubmitted: boolean = false;
 
  constructor(
    private contactsService: ContactsService, 
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private location: Location) {
      this.contact = new Contact({});
    }
    
    ngOnInit(): void {
    this.activatedRoute.data.subscribe(data => {
      this.isEditableContact = data.isEditable;
      if(this.isEditableContact) {
        let contactToEdit = this.contactsService.getContactById(this.activatedRoute.snapshot.params.id);
        if(contactToEdit) this.contact = {...contactToEdit};
      }
    })

    this.intializeContactForm();
  }
  
  intializeContactForm() {
    this.contactForm = new FormGroup({
      'name' : new FormControl(this.contact.name, Validators.required),
      'email' : new FormControl(this.contact.email, [Validators.required, Validators.pattern(/(^([a-zA-Z0-9.](?!\.\.))+@[a-zA-Z0-9-]{2,30}[.][a-zA-Z0-9.]{2,5}$)/i)]),
      'mobile' : new FormControl(this.contact.mobile, [Validators.required, Validators.pattern(/^[9876]\d{9}$/)]),
      'landline' : new FormControl(this.contact.landline, [Validators.required, Validators.pattern(/^[9876]\d{9}$/)]),
      'website' : new FormControl(this.contact.website),
      'address' : new FormControl(this.contact.address),
    })
  }

  onSubmit() {
    this.idFormSubmitted = true;
    if(this.contactForm.valid) {
      if(this.isEditableContact) {
        let contact = new Contact({ ...this.contactForm.value, id: this.activatedRoute.snapshot.params.id, });
        this.contactsService.updateContact(contact);
      } else {
        let contact = new Contact({...this.contactForm.value});
        this.contactsService.addContact(contact)
        this.router.navigateByUrl('/contacts/contact-detail/'+contact.id);
      }

      this.contactForm.reset();
    } 
  }

  onCloseContactForm() {
    this.location.back();
  }

}
