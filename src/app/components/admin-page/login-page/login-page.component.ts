import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { take } from 'rxjs';
import { UserFormData } from 'src/app/models/auth-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public formGroup: FormGroup;
  public minPasswordLength: number = 8;
  public isSubmitted: boolean = false;
  public guardMessage: string = "";

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    public readonly authService: AuthService,
  ) { }

  public ngOnInit(): void {
    this.route.queryParams.pipe(take(1)).subscribe((params) => {
      if(params["loginAgain"]) {
        this.guardMessage = "Please, log in first";
      } else if (params["authFailed"]) {
        this.guardMessage = "Session expired. Please, Log in again";
      };
    });

    this.formGroupInitialization();
  }

  public onFormSubmit(): void {
    this.isSubmitted = true;

    const userFormData: UserFormData = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
    };

    this.authService.login(userFormData)
    .pipe(take(1))
    .subscribe(() => {
      this.formGroup.reset();
      this.router.navigate(["/admin", "dashboard"]);

      this.isSubmitted = false;
    });
  }

  private formGroupInitialization(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(this.minPasswordLength)]],
    });
  }
}
