import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ContactFormComponent } from '../shared/contact-form';
import { ContactsComponent, ContactDetailComponent } from '../contacts';

const routes: Routes = [
  {path: 'contacts', component: ContactsComponent,
    children: [
      {path: 'contact-detail/:id', component: ContactDetailComponent},
      {path: 'add-contact', component: ContactFormComponent},
      {path: 'edit-contact/:id', component: ContactFormComponent, data: {isEditable: true} },
    ]
  },
  {path: '**', redirectTo: '/contacts', pathMatch: 'full'},
];

@NgModule({
  declarations: [],
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [RouterModule]
})
export class ContactsRoutingModule { }
