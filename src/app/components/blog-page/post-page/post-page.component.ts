import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { combineLatest, Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
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
    private readonly articleService: ArticleService,
    private readonly blogService: BlogService,
  ) { }

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  private articlesInicizlization(): void {
    this.blogService.goToScreenTop();

    combineLatest([this.articleService.articlesStorage$, this.route.params])
      .pipe(
        takeUntil(this.onDestroy$),
        filter(([articles, _]) => !!articles.length),
      )
      .subscribe(([articles, params]) => {
        const articleId = params['id'];
        const currentArticle = articles.find((article) => article.id === articleId);

        this.article = currentArticle;
        this.titleService.setTitle(currentArticle.header);
      });
  }
}
