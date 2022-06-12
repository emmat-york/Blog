import { Component, ComponentFactoryResolver, OnDestroy, OnInit, ViewContainerRef } from '@angular/core';
import { Router } from '@angular/router';
import { Subject, takeUntil } from 'rxjs';
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
  private readonly onDestroy$: Subject<void> = new Subject<void>();

  constructor(
    public blogService: BlogService,
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly resolver: ComponentFactoryResolver,
    private readonly viewContainerRef: ViewContainerRef,
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
      this.viewContainerRef.createComponent(modalFactory);
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
        this.viewContainerRef.clear();
      } else {
        this.viewContainerRef.clear();
      }
    });
  }
}
