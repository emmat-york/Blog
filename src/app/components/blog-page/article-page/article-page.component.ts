import { Component, ComponentFactoryResolver, ComponentRef, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { filter, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';
import { ArticlePhotoModalComponent } from './article-photo-modal/article-photo-modal.component';

@Component({
  selector: 'app-article-page',
  templateUrl: './article-page.component.html',
  styleUrls: ['./article-page.component.scss']
})
export class ArticlePageComponent implements OnInit, OnDestroy {
  public article: Article;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly titleService: Title,
    private readonly route: ActivatedRoute,
    private readonly articleService: ArticleService,
    private readonly blogService: BlogService,
    private readonly viewContainerRef: ViewContainerRef,
    private readonly resolver: ComponentFactoryResolver,
  ) { }

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onOpenArticleImage(): void {
    const modalFactory = this.resolver.resolveComponentFactory(ArticlePhotoModalComponent);
    const modal: ComponentRef<ArticlePhotoModalComponent> = this.viewContainerRef.createComponent(modalFactory);
    modal.instance.articleImagePath = this.article.photo;
    modal.instance.viewContainerRef = this.viewContainerRef;
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
