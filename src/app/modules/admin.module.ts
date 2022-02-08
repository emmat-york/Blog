import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from '../components/admin-page/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from '../components/admin-page/create-page/create-page.component';
import { EditPageComponent } from '../components/admin-page/edit-page/edit-page.component';

@NgModule({
  declarations: [
    AdminPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: AdminPageComponent, children: [
        { path: 'dashboard', component: DashboardPageComponent },
        { path: 'create', component: CreatePageComponent },
        { path: 'post/:id/edit', component: EditPageComponent },
      ] },
    ]),
  ],
})
export class AdminModule { }
