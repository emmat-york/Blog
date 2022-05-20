import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { take } from 'rxjs/operators';
import { ArticleFormData } from 'src/app/models/create-page.model';
import { PostsService } from 'src/app/services/posts.service';

@Component({
  selector: 'app-create-page',
  templateUrl: './create-page.component.html',
  styleUrls: ['./create-page.component.scss']
})
export class CreatePageComponent implements OnInit {
  public articleFormGroup: FormGroup;

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
    }

    const articleFormData: ArticleFormData = {
      ...this.articleFormGroup.value,
      articleReleaseDate: new Date(),
    };

    this.postServise.createPost(articleFormData)
    .pipe(take(1))
    .subscribe((data) => {
      console.log(data);

      this.articleFormGroup.reset();
    });
  }

  private formGroupInitialization(): void {
     this.articleFormGroup = this.formBuilber.group({
      auther: [null, Validators.required],
      header: [null, Validators.required],
      article: [null, Validators.required],
    });
  }
}
