import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { ArticleService } from 'src/app/services/article.service';
import { Article } from 'src/app/models/article.model';
import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { Title } from '@angular/platform-browser';
import { PageTitles } from 'src/app/models/title.model';
import { BlogService } from 'src/app/services/blog.service';
import { RemoveArticleModalComponent } from '../../shared/remove-article-modal/remove-article-modal.component';
import { ChangeDirection, PagginationValues } from '../../blog-page/home-page/home-page.component';

@Component({
  selector: 'app-dashboard-page',
  templateUrl: './dashboard-page.component.html',
  styleUrls: ['./dashboard-page.component.scss']
})
export class DashboardPageComponent implements OnInit, OnDestroy {
  public searchRequest: string = "";
  public articles: Article[] = [];
  public isDeleting: boolean;
  public pageNumber: number = 1;
  public pagginationValues: PagginationValues;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    public readonly articlesService: ArticleService,
    private readonly titleService: Title,
    private readonly blogService: BlogService,
    private readonly resolver: ComponentFactoryResolver,
    private readonly viewContainerRef: ViewContainerRef,
  ) {}

  public ngOnInit(): void {
    this.articlesInicialization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onPageChange(direction: ChangeDirection): void {
    direction === "Previous" ? this.pageNumber-- : this.pageNumber++;
    this.setPaggination();
  }

  public removeArticle(articleId: string): void {
    // Modal opening
    const modalFactory = this.resolver.resolveComponentFactory(RemoveArticleModalComponent);
    const removeModalComponent: ComponentRef<RemoveArticleModalComponent> = this.viewContainerRef.createComponent(modalFactory);

    removeModalComponent.instance.modalData = {
      articleId,
      articles: this.articles,
      viewContainerRef: this.viewContainerRef,
    };
  }

  private articlesInicialization(): void {
    this.titleService.setTitle(PageTitles.ADMIN_DASHBOARD);
    this.blogService.goToScreenTop();

    this.articlesService.articlesStorage$
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
