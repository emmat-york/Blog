import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Title } from '@angular/platform-browser';
import { ActivatedRoute, Router } from '@angular/router';
import { finalize, take } from 'rxjs';
import { UserFormData } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { PageTitles } from 'src/common/common-variables';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public loginFormGroup: FormGroup;
  public minPasswordLength: number = 8;
  public isSubmitted: boolean = false;
  public guardMessage: string = "";

  constructor(
    public readonly authService: AuthService,
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly titleService: Title,
  ) { }

  public ngOnInit(): void {
    this.route.queryParams
      .pipe(take(1))
      .subscribe((params) => {
        if (params["loginAgain"]) {
          this.guardMessage = "Session expired. Please, log in again";
        } else if (params["authFailed"]) {
          this.guardMessage = "Autorization failed. Please, log in again";
        };
      });

    this.formGroupInitialization();
    this.titleService.setTitle(PageTitles.ADMIN_LOGIN);
  }

  public onFormSubmit(): void {
    this.isSubmitted = true;

    const userFormData: UserFormData = {
      email: this.loginFormGroup.value.email,
      password: this.loginFormGroup.value.password,
    };

    this.authService.login(userFormData)
      .pipe(
        take(1),
        finalize(() => {
          this.isSubmitted = false;
        }),
      )
      .subscribe(() => {
        this.loginFormGroup.reset();
        this.router.navigate(["/admin", "dashboard"]);
      });
  }

  private formGroupInitialization(): void {
    this.loginFormGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(this.minPasswordLength)]],
      checkbox: [false],
    });
  }
}
