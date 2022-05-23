import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-blog-page',
  templateUrl: './blog-page.component.html',
  styleUrls: ['./blog-page.component.scss']
})
export class BlogPageComponent implements AfterViewInit {
  @ViewChild("blogContainer", { static: false }) private screenContainer: ElementRef<HTMLElement>;
  public isScreenScrollable: boolean = false;

  constructor(
    public readonly commonService: CommonService,
    public readonly authService: AuthService,
  ) { }

  public ngAfterViewInit(): void {
    this.isScreenScrollable = CommonService.isScreenScrollable(this.screenContainer);
  }

  public logOut(): void {
    this.authService.logOut();
  }
}
