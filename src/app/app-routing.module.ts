import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactDetailComponent } from './contacts/contact-detail/contact-detail.component';
import { ContactsComponent } from './contacts/contacts.component';
import { ContactFormComponent } from './shared/contact-form/contact-form.component';

const routes: Routes = [
  {path: '', redirectTo: '/contacts', pathMatch: 'full'},
  {path: 'contacts', component: ContactsComponent,
    children: [
      {path: 'contact-detail/:id', component: ContactDetailComponent},
      {path: 'add-contact', component: ContactFormComponent},
      {path: 'edit-contact/:id', component: ContactFormComponent},
    ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
