import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
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
    this.blogService.isFeatched$.next(false);
    
    this.articleService.fetchArticles()
    .pipe(take(1))
    .subscribe((articles) => {
      this.articles = articles;
      this.blogService.isFeatched$.next(true);
    });
  }
}
