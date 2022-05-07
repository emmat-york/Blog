import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { take } from 'rxjs';
import { User } from 'src/app/models/auth-model';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.component.html',
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent implements OnInit {
  public formGroup: FormGroup;
  public minPasswordLength: number = 8;

  constructor(
    private readonly formBuilder: FormBuilder,
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  public ngOnInit(): void {
    this.formGroupInitialization();
  }

  public onFormSubmit(): void {
    const userFormData: User = {
      email: this.formGroup.value.email,
      password: this.formGroup.value.password,
    };

    this.authService.login(userFormData)
    .pipe(take(1))
    .subscribe(() => {
      this.formGroup.reset();
      this.router.navigate(["/admin", "dashboard"]);
    });
  }

  public formGroupInitialization(): void {
    this.formGroup = this.formBuilder.group({
      email: [null, [Validators.required, Validators.email]],
      password: [null, [Validators.required, Validators.minLength(this.minPasswordLength)]],
    });
  }
}
