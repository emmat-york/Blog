import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {

  constructor(
    public readonly blogService: BlogService,
    public readonly authService: AuthService,
    public readonly postsService: PostsService
  ) { }

  public goToScreenTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
