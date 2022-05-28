import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[colorObserver]'
})
export class ColorObserverDirective {

  constructor(
    private readonly elementRef: ElementRef,
    private readonly renderer2: Renderer2,
  ) { }

  @HostListener("focus")
  public onInputFocus() {
    const backgroundColor = "#FFF";
    const color = "#000";

    this.setStyles(backgroundColor, color);
    window.scrollTo({ top: 410, behavior: 'smooth' });
  }

  @HostListener("blur")
  public onInputBlur() {
    const backgroundColor = "#3D3F45";
    const color = "#FFF";

    this.setStyles(backgroundColor, color);
  }

  private setStyles(backgroundColor: string, color: string): void {
    this.renderer2.setStyle(this.elementRef.nativeElement, "background-color", backgroundColor);
    this.renderer2.setStyle(this.elementRef.nativeElement, "color", color);
  }
}
