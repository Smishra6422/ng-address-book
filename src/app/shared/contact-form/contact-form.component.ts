import { Location } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Contact } from 'src/app/contacts/contact.modal';
import { ContactsService } from 'src/app/contacts/contacts.service';
import { v4 as uuid } from 'uuid';


@Component({
  selector: 'app-contact-form',
  templateUrl: './contact-form.component.html'
})
export class ContactFormComponent implements OnInit {
  contactForm: FormGroup;
  isEditContact: boolean = false;
  contact: Contact | undefined;
 
  constructor(
    private _contacts: ContactsService, 
    private _router: Router,
    private _route: ActivatedRoute,
    private _location: Location) {}

  ngOnInit(): void {
    this.isEditContact = this._route.snapshot.routeConfig?.path?.includes('edit-contact') ? true : false;
    if(this.isEditContact) {
      this.contact = this._contacts.getContactById(this._route.snapshot.params.id)
    }
    this.intializeContactForm();
  }
  
  intializeContactForm() {
    this.contactForm = new FormGroup({
      'name' : new FormControl(this.contact ? this.contact.name : "", Validators.required),
      'email' : new FormControl(this.contact ? this.contact.email : "", [Validators.required, Validators.pattern(/(^([a-zA-Z0-9_.](?!\.\.))+@[a-zA-Z0-9-]{2,30}[.][a-zA-Z0-9.]{2,5}$)/i)]),
      'mobile' : new FormControl(this.contact ? this.contact.mobile : "", [Validators.required, Validators.pattern(/^[9876]\d{9}$/)]),
      'landline' : new FormControl(this.contact ? this.contact.landline : "", [Validators.required, Validators.pattern(/^[9876]\d{9}$/)]),
      'website' : new FormControl(this.contact ? this.contact.website : ""),
      'address' : new FormControl(this.contact ? this.contact.address : ""),
    })
  }

  onSubmit() {
    if(this.contactForm.valid) {
      if(this.isEditContact) {
        this._contacts.updateContact({ ...this.contactForm.value, id: this._route.snapshot.params.id, });
        this.contactForm.reset();
      } else {
        let id = uuid();
        this._contacts.addContact({ ...this.contactForm.value, id })
        this.contactForm.reset();
        this._router.navigateByUrl('/contacts/contact-detail/'+id);
      }
    } else {
      this.validateAllFormFields(this.contactForm);
    }
  }

  validateAllFormFields(formGroup: FormGroup) {         
    Object.keys(formGroup.controls).forEach(field => {  
      const control = formGroup.get(field);             
      if (control instanceof FormControl) {           
        control.markAsTouched({ onlySelf: true });
      } 
    });
  }

  onCloseContactForm() {
    this._location.back();
  }

}
