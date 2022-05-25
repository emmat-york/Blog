import { Component, OnInit } from '@angular/core';
import { of } from 'rxjs';
import { switchMap, take } from 'rxjs/operators';
import { Article } from 'src/app/models/create-page.model';
import { BlogService } from 'src/app/services/blog.service';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit {
  public articles: Article[] = [];

  constructor(
    private readonly articleService: PostsService,
    public readonly blogService: BlogService,
  ) { }

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  private articlesInicizlization(): void {
    this.articleService.articlesStorage$
    .pipe(
      take(1),
      switchMap((articles) => {
        if (articles) {
          return of(articles);
        } else {
          return this.articleService.fetchArticles();
        };
      }),
    )
    .subscribe((articles) => {
      this.articles = articles;
    });
  }
}
