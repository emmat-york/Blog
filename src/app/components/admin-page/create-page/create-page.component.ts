import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Article, ArticleFormData } from 'src/app/models/article.model';
import { ArticleService } from 'src/app/services/article.service';
import { catchError, map, take, withLatestFrom } from 'rxjs/operators';
import { Title } from '@angular/platform-browser';
import { PageTitles } from 'src/app/models/title.model';
import { AlertService } from 'src/app/services/alert.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public articleFormGroup: FormGroup;
  public isSubmitted: boolean = false;

  constructor(
    private readonly formBuilber: FormBuilder,
    private readonly articleService: ArticleService,
    private readonly titleService: Title,
    private readonly alertService: AlertService,
    private readonly blogService: BlogService,
  ) {}

  public ngOnInit(): void {
    this.componentInizialization();
    this.formGroupInitialization();
  }

  public onFormSubmit(): void {
    if (this.articleFormGroup.invalid) {
      return;
    };

    this.isSubmitted = true;

    const articleFormData: ArticleFormData = {
      ...this.articleFormGroup.value,
      releaseDate: new Date(),
    };

    this.articleService.createArticle(articleFormData)
      .pipe(
        take(1),
        catchError((error) => {
          console.log(error);
          this.alertService.error("Something went wrong while creating the article!");
          return [];
        }),
        withLatestFrom(this.articleService.articlesStorage$),
        map(([{ name: articleId }, articlesStorage]) => {
          const newArticles: Article[] = [
            ...articlesStorage,
          ];

          const newArticle: Article = {
            ...articleFormData,
            id: articleId,
          };

          newArticles.push(newArticle);
          return newArticles;
        }),
      )
      .subscribe((updatedArticles) => {
        this.articleService.articlesStorage$.next(updatedArticles);
        this.articleFormGroup.reset();
        this.isSubmitted = false;
        this.alertService.success("Article has been seccessfully created!");
      });
  }

  private componentInizialization(): void {
    this.titleService.setTitle(PageTitles.ADMIN_CREATE);
    this.blogService.goToScreenTop();
  }

  private formGroupInitialization(): void {
    this.articleFormGroup = this.formBuilber.group({
      auther: [null, Validators.required],
      autherLink: [null, Validators.required],
      header: [null, Validators.required],
      article: [null, Validators.required],
      photo: [null, Validators.required],
    });
  }
}
