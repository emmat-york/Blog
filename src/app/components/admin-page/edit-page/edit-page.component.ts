import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute } from '@angular/router';
import { Subject } from 'rxjs';
import { catchError, take, filter, withLatestFrom, takeUntil } from 'rxjs/operators';
import { Article } from 'src/app/models/article.model';
import { AlertService } from 'src/app/services/alert.service';
import { ArticleService } from 'src/app/services/article.service';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-edit-page',
  templateUrl: './edit-page.component.html',
  styleUrls: ['./edit-page.component.scss']
})
export class EditPageComponent implements OnInit {
  public editPageFormGroup: FormGroup;
  public article: Article;
  public isSubmitted: boolean;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly router: ActivatedRoute,
    private readonly articleService: ArticleService,
    private readonly formBuilder: FormBuilder,
    private readonly titleService: Title,
    private readonly alertService: AlertService,
    private readonly blogService: BlogService,
  ) { }

  public ngOnInit(): void {
    this.articleInicialization();
  }

  public onFormSubmit(): void {
    if (this.editPageFormGroup.invalid) {
      return;
    };

    this.isSubmitted = true;

    const articleFormData: Article = {
      ...this.editPageFormGroup.value,
      id: this.article.id,
      releaseDate: new Date(),
    };

    this.articleService.updateArticle(articleFormData)
      .pipe(
        take(1),
        catchError((error) => {
          this.alertService.error("Something went wrong while updating article!");
          throw new Error(error);
        })
      )
      .subscribe(() => {
        this.isSubmitted = false;
        this.article = {
          ...this.editPageFormGroup.value,
        };

        this.alertService.success("Article has been successfully updated!");
      });
  }

  private articleInicialization(): void {
    this.blogService.goToScreenTop();

    this.articleService.articlesStorage$
      .pipe(
        takeUntil(this.onDestroy$),
        filter((articles) => !!articles),
        withLatestFrom(this.router.params)
      )
      .subscribe(([articles, params]) => {
        const articleId = params['id'];
        this.article = articles.find((article) => article.id === articleId);

        this.formGroupInitialization(this.article);
        this.titleService.setTitle(this.article.header);
      });
  }

  private formGroupInitialization(article: Article): void {
    const { auther, autherLink, header, article: articleText, photo, previewText } = article;

    this.editPageFormGroup = this.formBuilder.group({
      auther: [auther, Validators.required],
      autherLink: [autherLink, Validators.required],
      header: [header, Validators.required],
      previewText: [previewText, Validators.required],
      article: [articleText, Validators.required],
      photo: [photo, Validators.required],
    });
  }
}
