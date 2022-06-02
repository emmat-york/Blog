import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';
import { Alert } from '../models/alert.model';

@Injectable()
export class AlertService {
  public alert$ = new Subject<Alert>();

  constructor() { }

  public success(text: string): void {
    this.alert$.next({
      type: 'success',
      messageText: text,
    });
  }

  public warning(text: string): void {
    this.alert$.next({
      type: 'warning',
      messageText: text,
    });
  }

  public error(text: string): void {
    this.alert$.next({
      type: 'error',
      messageText: text,
    });
  }
}
