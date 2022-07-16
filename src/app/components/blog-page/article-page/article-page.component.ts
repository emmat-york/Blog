import { Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  @ViewChild("text", {static: false}) public textArea: ElementRef<HTMLElement>;
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

    this.articleService.articlesStorage$
    .pipe(
      takeUntil(this.onDestroy$),
      filter((articles) => !!articles),
      withLatestFrom(this.route.params)
    )
    .subscribe(([articles, params]) => {
      const articleId = params['id'];
      this.article = articles.find((article) => article.id === articleId);
      
      this.titleService.setTitle(this.article.header);
    });
  }
}
