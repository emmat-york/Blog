import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

type ButtonType = "Log In" | "Log out";

@Component({
  selector: 'app-logout-button',
  templateUrl: './logout-button.component.html',
  styleUrls: ['./logout-button.component.scss']
})
export class LogoutButtonComponent implements OnInit {
  public authStatus: ButtonType;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) {}

  public ngOnInit(): void {
    this.componentInicialization();
  }

  public onAuthAction(): void {
    if (this.authStatus === "Log out") {
      this.authStatus = "Log In";
      this.router.navigate(['/']);
      this.authService.logOut();
    } else {
      this.authStatus = "Log out";
      this.router.navigate(['/admin', 'login']);
    }
  }

  private componentInicialization(): void {
    this.authStatus = this.authService.isAuth() ? "Log out" : "Log In";
  }
}
