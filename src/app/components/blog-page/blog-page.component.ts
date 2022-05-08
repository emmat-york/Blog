import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements OnInit {
  public isInputFocused: boolean = false;

  constructor() { }

  ngOnInit(): void {
  }

  public goToScreenTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  public changeInputState(eventState: boolean): void {
    this.isInputFocused = eventState;
  }
}
