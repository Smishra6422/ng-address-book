import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ContactsRoutingModule } from './contacts-routing.module';
import { ContactsComponent, ContactDetailComponent } from '../contacts';
import { NgxSpinnerModule } from 'ngx-spinner';



@NgModule({
  declarations: [
    ContactDetailComponent,
    ContactsComponent
  ],
  imports: [
    CommonModule, 
    ContactsRoutingModule,
    NgxSpinnerModule
  ], 
  exports: [NgxSpinnerModule]
})
export class ContactsModule { }
