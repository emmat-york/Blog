import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ArticleFormData } from 'src/app/models/create-page.model';
import { PostsService } from 'src/app/services/posts.service';
import { catchError, take, tap } from 'rxjs/operators';

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
    private readonly postServise: PostsService,
  ) { }

  public ngOnInit(): void {
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

    this.postServise.createArticle(articleFormData)
    .pipe(
      take(1),
      catchError((error) => {
        console.log(error);

        return [];
      }),
      tap(() => {
        this.isSubmitted = false;
      }),
    )
    .subscribe(() => {
      this.articleFormGroup.reset();
    });
  }

  private formGroupInitialization(): void {
     this.articleFormGroup = this.formBuilber.group({
      auther: [null, Validators.required],
      header: [null, Validators.required],
      article: [null, Validators.required],
      photo: [null, Validators.required],
    });
  }
}
