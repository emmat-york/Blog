import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {
  constructor(
    public readonly authService: AuthService,
    public readonly blogService: BlogService,
    private readonly router: Router,
  ) {}

  public goToMainPage(): void {
    this.blogService.goToScreenTop();
    this.router.navigate(["/"]);
  }
}
