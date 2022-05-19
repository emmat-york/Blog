import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot } from '@angular/router';
import { Observable, of } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(
    private readonly auth: AuthService,
    private readonly router: Router
  ) { }

  public canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot,
  ): Observable<boolean> {
    if (this.auth.isAuth()) {
      return of(true)
    } else {
      this.auth.logOut();
      this.router.navigate(["/admin", "login"], {
        queryParams: {
          loginAgain: true,
        },
      });

      return of(false);
    }
  }
}
