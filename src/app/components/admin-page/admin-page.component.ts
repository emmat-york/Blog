import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(
    private readonly router: Router,
    public readonly authService: AuthService,
    ) { }

  ngOnInit(): void { }

  public logOut(event: Event): void {
    event.preventDefault();

    this.authService.logOut();
    this.router.navigate(["/admin", "login"]);
  }

}
