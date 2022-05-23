import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {

  constructor(
    private readonly router: Router,
    public readonly authService: AuthService,
    public readonly adminService: AdminService,
  ) { }

  public logOut(event: Event): void {
    event.preventDefault();

    this.authService.logOut();
    this.router.navigate(["/admin", "login"]);
  }
}
