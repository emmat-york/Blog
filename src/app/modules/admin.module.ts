import { NgModule } from '@angular/core';
import { AdminPageComponent } from '../components/admin-page/admin-page.component';
import { RouterModule } from '@angular/router';
import { DashboardPageComponent } from '../components/admin-page/dashboard-page/dashboard-page.component';
import { CreatePageComponent } from '../components/admin-page/create-page/create-page.component';
import { EditPageComponent } from '../components/admin-page/edit-page/edit-page.component';
import { LoginPageComponent } from '../components/admin-page/login-page/login-page.component';
import { ReactiveFormsModule } from '@angular/forms';
import { SharedModule } from './shared.module';
import { AuthGuard } from '../services/auth.guard';

@NgModule({
  declarations: [
    AdminPageComponent,
    LoginPageComponent,
    DashboardPageComponent,
    CreatePageComponent,
    EditPageComponent,
  ],
  imports: [
    SharedModule,
    ReactiveFormsModule,
    RouterModule.forChild([
      { path: '', component: AdminPageComponent, children: [
        { path: '', redirectTo: '/admin/login', pathMatch: 'full' },
        { path: 'login', component: LoginPageComponent },
        { path: 'dashboard', component: DashboardPageComponent, canActivate: [AuthGuard] },
        { path: 'create', component: CreatePageComponent, canActivate: [AuthGuard] },
        { path: 'post/:id/edit', component: EditPageComponent, canActivate: [AuthGuard] },
      ] },
    ]),
  ],
  exports: [RouterModule],
  providers: [AuthGuard],
})
export class AdminModule { }
