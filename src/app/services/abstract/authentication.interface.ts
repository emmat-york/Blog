import { HttpErrorResponse } from "@angular/common/http";
import { Observable } from "rxjs";
import { AuthResponse, UserFormData } from "src/app/models/auth.model";

export abstract class Authentication {
    public abstract get token(): string;

    public abstract login(userData: UserFormData): Observable<AuthResponse | HttpErrorResponse>;

    public abstract logOut(): void;

    public abstract isAuth(): boolean;
}
