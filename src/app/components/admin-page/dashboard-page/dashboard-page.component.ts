import { Component, OnDestroy, OnInit } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { catchError, take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PageTitles } from 'src/common/common-variables';
import { AlertService } from 'src/app/services/alert.service';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public searchRequest: string = "";
  public articles: Article[];
  public isDeleting: boolean = false;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    public readonly articlesService: ArticleService,
    private readonly titleService: Title,
    private readonly alertService: AlertService,
  ) {}

  public ngOnInit(): void {
    this.articlesInicialization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public removeArticle(articleId: string): void {
    this.articlesService.removeArticle(articleId)
      .pipe(
        take(1),
        catchError((error) => {
          console.log(error);
          this.alertService.error("Something went wrong while removing the article!");
          return null;
        }),
      )
      .subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== articleId);
        this.articlesService.articlesStorage$.next(this.articles);
        this.alertService.success("Article has been seccessfully removed!");
      });
  }

  public goToScreenTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private articlesInicialization(): void {
    this.titleService.setTitle(PageTitles.ADMIN_DASHBOARD);

    this.articlesService.articlesStorage$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((articles) => {
        this.articles = articles;
      });
  }
}
