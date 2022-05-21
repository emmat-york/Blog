import { Component } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent {
  
  constructor(
    public readonly commonService: CommonService,
    public readonly authService: AuthService,
  ) { }

  public goToScreenTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
