import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Article } from 'src/app/models/create-page.model';
import { take } from 'rxjs/operators';
import { Router } from '@angular/router';
import { AdminService } from 'src/app/services/admin.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public searchRequest: string = "";
  public articles: Article[];
  public isDeleting: boolean = false;

  constructor(
    private readonly postService: PostsService,
    private readonly router: Router,
    public readonly adminService: AdminService,
  ) { }

  public ngOnInit(): void {
    this.articlesInicialization();
  }

  public ngOnDestroy(): void {
    this.adminService.isFeatched$.next(false);
  }

  public goToAditArticlePage(articleId: string): void {
    this.router.navigate(['/admin', 'post', articleId, 'edit']);
  }

  public removeArticle(articleId: string): void {
    this.postService.removeArticle(articleId)
    .pipe(take(1))
    .subscribe(() => {
      this.articles = this.articles.filter(article => article.id !== articleId);
    });
  }

  private articlesInicialization(): void {
    this.postService.fetchArticles()
    .pipe(take(1))
    .subscribe((articles) => {
      this.articles = articles;
      this.adminService.isFeatched$.next(true);
    });
  }
}
