import { Component, OnInit } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { take, withLatestFrom } from 'rxjs/operators';
import { Article } from 'src/app/models/create-page.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.scss']
})
export class PostPageComponent implements OnInit {
  public article: Article;

  constructor(
    private readonly titleService: Title,
    private readonly router: ActivatedRoute,
    private readonly articleService: PostsService,
  ) { }

  public ngOnInit(): void {
    this.articlesInicizlization();
  }

  private articlesInicizlization(): void {
    this.router.params
      .pipe(
        take(1),
        withLatestFrom(this.articleService.articlesStorage$),
      )
      .subscribe(([params, articles]) => {
        this.article = articles.find(article => article.id === params["id"]);
        this.titleService.setTitle(this.article.header);
      });
  }
}
