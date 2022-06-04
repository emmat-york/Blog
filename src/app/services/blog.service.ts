import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { AuthAction, ButtonType } from '../models/auth.model';

@Injectable({
  providedIn: "root",
})
export class BlogService {
  public searchRequest: string = "";
  public authStatus: ButtonType;
  public readonly onModalClose$ = new Subject<AuthAction>();
}
