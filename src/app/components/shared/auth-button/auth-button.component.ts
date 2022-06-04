import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
import { RefDirective } from 'src/app/directives/ref.directive';
import { AuthAction } from 'src/app/models/auth.model';
import { AuthService } from 'src/app/services/auth.service';
import { BlogService } from 'src/app/services/blog.service';
import { LogoutModalComponent } from '../logout-modal/logout-modal.component';

@Component({
  selector: 'app-auth-button',
  templateUrl: './auth-button.component.html',
  styleUrls: ['./auth-button.component.scss']
})
export class AuthButtonComponent implements OnInit, OnDestroy {
  @ViewChild(RefDirective) private ref: RefDirective;
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly resolver: ComponentFactoryResolver,
    public blogService: BlogService,
  ) {}

  public ngOnInit(): void {
    this.componentInicialization();
  }

  public ngOnDestroy(): void {
    this.onDestroy$.next();
    this.onDestroy$.complete();
  }

  public onAuthAction(): void {
    if (this.blogService.authStatus === "Log out") {
      // Modal opening
      const modalFactory = this.resolver.resolveComponentFactory(LogoutModalComponent);
      this.ref.containerRef.createComponent(modalFactory);
    } else {
      this.router.navigate(['/admin', 'login']);
    }
  }

  private componentInicialization(): void {
    this.blogService.authStatus = this.authService.isAuth() ? "Log out" : "Log In";

    this.blogService.onModalClose$
    .pipe(takeUntil(this.onDestroy$))
    .subscribe((action: AuthAction) => {
      if (action === "SignOut") {
        this.blogService.authStatus = "Log In";
        this.router.navigate(['/']);
        this.authService.logOut();
        this.ref.containerRef.clear();
      } else {
        this.ref.containerRef.clear();
      }
    });
  }
}
