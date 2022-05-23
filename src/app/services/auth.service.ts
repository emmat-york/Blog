import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, Subject, tap, throwError } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, LoginPayload, UserFormData } from '../models/auth-model';

@Injectable({
  providedIn: "root"
})
export class AuthService {
  public loginErrors$: Subject<string> = new Subject<string>();
  private loginPath: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;
  
  constructor(private readonly http: HttpClient) { }

  get token(): string | null {
    const currentDate = new Date();
    const expDate = new Date(localStorage.getItem("fb-token-exp") as string);

    if (currentDate > expDate) {
      this.logOut();

      return null;
    }

    return localStorage.getItem("fb-token") as string;
  }

  public login(userData: UserFormData): Observable<AuthResponse | HttpErrorResponse | null > {
    const returnSecureToken = true;
    const loginPayload: LoginPayload = {
      ...userData,
      returnSecureToken,
    };

    return this.http.post<any>(this.loginPath, loginPayload)
    .pipe(
      tap(this.setToken),
      catchError(this.handleLoginError.bind(this))
    );
  }

  public logOut(): void {
    this.setToken(null);
  }

  public isAuth(): boolean {
    return !!this.token;
  }

  private setToken(authResponse: AuthResponse | null): void {
    if (authResponse) {
      const mappedExpiresInToMiliseconds: number = Number(authResponse.expiresIn) * 1000;
      const currentDate = new Date().getTime();
  
      const expData = new Date(currentDate + mappedExpiresInToMiliseconds);
  
      localStorage.setItem("fb-token", authResponse.idToken);
      localStorage.setItem("fb-token-exp", expData.toString());
    } else {
      localStorage.clear();
    }
  }

  private handleLoginError(errorLogin: HttpErrorResponse): Observable<HttpErrorResponse> {
    const { message } = errorLogin.error.error;

    switch(message) {
      case "INVALID_EMAIL":
        this.loginErrors$.next("Invalid email. Please, enter correct email");
        break;
      case "INVALID_PASSWORD":
        this.loginErrors$.next("Invalid password. Please, enter correct password");
        break;
      case "EMAIL_NOT_FOUND":
        this.loginErrors$.next("Email not found");
        break;
    }

    return throwError(errorLogin);
  }
}
