import { Injectable, ElementRef } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CommonService {
  public searchRequest: string = "";

  constructor() { }

  public static isScreenScrollable(element: ElementRef<HTMLElement>): boolean {
    const clientHeight = element.nativeElement.clientHeight;
    return clientHeight < window.screen.height + 50;
  }

  public goToScreenTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
