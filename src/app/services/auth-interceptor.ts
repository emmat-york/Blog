import { HttpErrorResponse, HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { catchError, Observable, throwError } from 'rxjs';
import { AuthService } from './auth.service';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
  ) { }

  public intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    if (this.authService.isAuth()) {
      req = req.clone({
        setParams: {
          auth: this.authService.token as any,
        },
      });
    }

    return next.handle(req)
    .pipe(
      catchError((error: HttpErrorResponse) => {
        console.log("[Inetrceptor error]: ", error);

        if (error.status === 401) {
          this.router.navigate(["/admin", "login"], {
            queryParams: {
              authFailed: true,
            },
          });
        }

        return throwError(error);
      })
    );
  }
}
