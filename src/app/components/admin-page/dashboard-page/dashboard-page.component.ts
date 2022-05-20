import { Component, OnInit } from '@angular/core';
import { ArticleFormData } from 'src/app/models/create-page.model';
import { PostsService } from 'src/app/services/posts.service';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public postSearch: string = "";
  public posts: ArticleFormData[];

  constructor(private readonly postService: PostsService) { }

  public ngOnInit(): void {
    this.postsInicizlization();
  }

  public postsInicizlization(): void {
    this.postService.getAllPosts().subscribe((posts) => {
      this.posts = posts;
    });
  }

  public deletePost(postId: string | undefined): void {
    this.postService.removePost(postId).pipe(take(1)).subscribe(() => {
      this.posts = this.posts.filter(post => post.id !== postId);
    });
  }
}
