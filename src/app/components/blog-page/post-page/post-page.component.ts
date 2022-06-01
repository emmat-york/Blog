import { Component, OnDestroy, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { Subject } from 'rxjs';
import { switchMap, takeUntil, withLatestFrom } from 'rxjs/operators';
import { Article } from 'src/app/models/create-page.model';
import { PostsService } from 'src/app/services/posts.service';

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
    private readonly articleService: PostsService,
  ) { }

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onReturnBack(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });
    this.router.navigate(['/']);
  }

  private articlesInicizlization(): void {
    window.scrollTo({ top: 0, behavior: 'auto' });

    this.route.params
      .pipe(
        takeUntil(this.onDestroy$),
        switchMap((params) => {
          return this.articleService.getArticleById(params['id']);
        }),
      )
      .subscribe((article) => {
        this.article = article;
        this.titleService.setTitle(this.article.header);
      });
  }
}
