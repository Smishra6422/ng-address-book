import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent, ContactDetailComponent } from '../contacts';



@NgModule({
  declarations: [
    ContactDetailComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule, 
    ContactsRoutingModule
  ]
})
export class ContactsModule { }
