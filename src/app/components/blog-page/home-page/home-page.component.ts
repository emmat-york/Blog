import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { BlogService } from 'src/app/services/blog.service';
import { ArticleService } from 'src/app/services/article.service';
import { PageTitles } from 'src/app/models/title.model';

export type ChangeDirection = "Previous" | "Next";

export interface PagginationValues {
  valueFrom: number;
  valueTo: number;
};

@Component({
  selector: 'app-home-page',
  templateUrl: './home-page.component.html',
  styleUrls: ['./home-page.component.scss']
})
export class HomePageComponent implements OnInit, OnDestroy {
  public articles: Article[] = [];
  public pageNumber: number = 1;
  public pagginationValues: PagginationValues;
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
    this.setPaggination();
  }

  private articlesInicizlization(): void {
    this.titleService.setTitle(PageTitles.BLOG_ARTICLES);
    this.blogService.goToScreenTop();

    this.articleService.articlesStorage$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((articles) => {
      this.articles = articles;
      this.setPaggination();
    });
  }

  private setPaggination(): void {
    // Example: Articles count - 11. Page - 2.
    const firstIndex = (this.pageNumber - 1) * 10; // (2 - 1) * 10 = 10 - First index.
    const possibleLastIndex = this.pageNumber * 10; // 2 * 10 = 20 - Max count of articles on the page.

    const pageArticlesLenght = this.articles
    .slice(firstIndex, possibleLastIndex).length; // Sliced articles in this range. 

    this.pagginationValues = {
      valueFrom: firstIndex, // Index of the first article - 10.
      valueTo: firstIndex + pageArticlesLenght, // The last article index - 10 + 1 = 11.
    };
  }
}
