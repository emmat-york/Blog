import { Component, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Article } from 'src/app/models/create-page.model';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit {
  public searchRequest: string = "";
  public articles: Article[];

  constructor(private readonly postService: PostsService) { }

  public ngOnInit(): void {
    this.articlesInicialization();
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
    });
  }
}
