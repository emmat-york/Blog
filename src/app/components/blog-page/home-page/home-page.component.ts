import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { BlogService } from 'src/app/services/blog.service';
import { ArticleService } from 'src/app/services/article.service';
import { PageTitles } from 'src/app/models/title.model';
import { ChangeDirection, PaginationValues } from 'src/app/models/pagination.model';
import { getPaginationValues } from 'src/app/helpers/pagination.helper';

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public articles: Article[] = [];
  public pageNumber: number = 1;
  public paginationValues: PaginationValues;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    public readonly blogService: BlogService,
    private readonly articleService: ArticleService,
    private readonly titleService: Title,
  ) { }

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onPageChange(direction: ChangeDirection): void {
    direction === "Previous" ? this.pageNumber-- : this.pageNumber++;
    this.setPagination();
  }

  private articlesInicizlization(): void {
    this.titleService.setTitle(PageTitles.BLOG_ARTICLES);
    this.blogService.goToScreenTop();

    this.articleService.articlesStorage$
    .pipe(
      takeUntil(this.onDestroy$))
    .subscribe((articles) => {
      this.articles = articles;

      if (this.articles) {
        this.setPagination();
      }
    });
  }

  private setPagination(): void {
    this.paginationValues = getPaginationValues(this.articles, this.pageNumber);
  }
}
