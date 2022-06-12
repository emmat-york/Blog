import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Params } from '@angular/router';
import { catchError, switchMap, take } from 'rxjs/operators';
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
  public isSubmitted: boolean = false;

  constructor(
    private readonly router: ActivatedRoute,
    private readonly articleService: ArticleService,
    private readonly formBuilder: FormBuilder,
    private readonly titleService: Title,
    private readonly alertService: AlertService,
    private readonly blogService: BlogService,
  ) {}

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
          console.log(error);
          this.alertService.error("Something went wrong while updating article!");

          return null;
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

    this.router.params
      .pipe(
        take(1),
        switchMap((params: Params) => {
          return this.articleService.getArticleById(params["id"]);
        }),
      )
      .subscribe((article: Article) => {
        this.formGroupInitialization(article);
        this.article = article;
        this.titleService.setTitle(this.article.header);
      });
  }

  private formGroupInitialization(article: Article): void {
    const { auther, autherLink, header, article: articleText, photo } = article;

    this.editPageFormGroup = this.formBuilder.group({
      auther: [auther, Validators.required],
      autherLink: [autherLink, Validators.required],
      header: [header, Validators.required],
      article: [articleText, Validators.required],
      photo: [photo, Validators.required],
    });
  }
}
