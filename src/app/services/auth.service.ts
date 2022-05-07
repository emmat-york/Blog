import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { AuthResponse, User } from '../models/auth-model';

@Injectable()
export class AuthService {
  private _idToken: string;
  private loginPath: string = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${environment.apiKey}`;
  
  constructor(private readonly http: HttpClient) { }

  get token(): string {
    return this._idToken;
  }

  public login(userData: User): Observable<AuthResponse> {
    return this.http.post<any>(this.loginPath, userData)
    .pipe(tap(this.setToken));
  }

  public logOut(): void {

  }

  public isAuth(): boolean {
    return !!this.token;
  }

  private setToken(authResponse: AuthResponse): void {
    console.log(authResponse);
    this._idToken = authResponse.idToken;
  }
}
