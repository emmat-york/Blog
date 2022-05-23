import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class AdminService {
  public isFeatched$: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  public goToScreenTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
