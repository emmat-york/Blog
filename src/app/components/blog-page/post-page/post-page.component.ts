import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit, OnDestroy {
  public article: Article;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly titleService: Title,
    private readonly route: ActivatedRoute,
    private readonly router: Router,
    private readonly articleService: ArticleService,
    private readonly blogService: BlogService,
  ) {}

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private articlesInicizlization(): void {
    this.blogService.goToScreenTop();

    this.route.params
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((params: Params) => {
          return this.articleService.getArticleById(params['id']);
        }),
      )
      .subscribe((article) => {
        this.article = article;
        this.titleService.setTitle(this.article.header);
      });
  }
}
