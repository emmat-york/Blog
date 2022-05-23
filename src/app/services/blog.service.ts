import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class BlogService {
  public searchRequest: string = "";
  public isFeatched$: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor() { }

  public goToScreenTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
