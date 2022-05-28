import { Component, OnDestroy, OnInit } from '@angular/core';
import { PostsService } from 'src/app/services/posts.service';
import { Article } from 'src/app/models/create-page.model';
import { take, takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PageTitles } from 'src/common/common-variables';

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
    public readonly articlesService: PostsService,
    private readonly titleService: Title,
  ) { }

  public ngOnInit(): void {
    this.articlesInicialization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public removeArticle(articleId: string): void {
    this.articlesService.removeArticle(articleId)
      .pipe(take(1))
      .subscribe(() => {
        this.articles = this.articles.filter(article => article.id !== articleId);
        this.articlesService.articlesStorage$.next(this.articles);
      });
  }

  public goToScreenTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  private articlesInicialization(): void {
    this.articlesService.articlesStorage$
      .pipe(takeUntil(this.onDestroy$))
      .subscribe((articles) => {
        this.articles = articles;
        this.titleService.setTitle(PageTitles.ADMIN_DASHBOARD);
      });
  }
}
