import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { Article } from 'src/app/models/create-page.model';
import { CommonService } from 'src/app/services/common.service';
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
    public readonly commonService: CommonService,
  ) { }

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  private articlesInicizlization(): void {
    this.articleService.fetchArticles()
    .pipe(take(1))
    .subscribe((articles) => {
      this.articles = articles;
    });
  }
}
