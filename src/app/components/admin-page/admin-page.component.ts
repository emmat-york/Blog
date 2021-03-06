import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent {
  constructor(
    public readonly authService: AuthService,
    public readonly articlesService: ArticleService,
    private readonly router: Router,
  ) {}

  public logOut(event: Event): void {
    event.preventDefault();
    this.authService.logOut();
    this.router.navigate(["/admin", "login"]);
  }
}
