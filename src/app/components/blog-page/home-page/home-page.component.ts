import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { BlogService } from 'src/app/services/blog.service';
import { ArticleService } from 'src/app/services/article.service';
import { PageTitles } from 'src/app/models/title.model';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public articles: Article[] = [];
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    public readonly blogService: BlogService,
    private readonly articleService: ArticleService,
    private readonly titleService: Title,
  ) {}

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private articlesInicizlization(): void {
    this.titleService.setTitle(PageTitles.BLOG_ARTICLES);

    this.articleService.articlesStorage$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((articles) => {
      this.articles = articles;

    });
  }
}
