import { AfterViewInit, Component, ElementRef, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';
import { CommonService } from 'src/app/services/common.service';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements AfterViewInit {
  @ViewChild("adminContainer") private adminContainer: ElementRef<HTMLElement>;
  public isScreenScrollable: boolean = false;

  constructor(
    private readonly router: Router,
    public readonly authService: AuthService,
    public readonly commonService: CommonService,
  ) { }

  public ngAfterViewInit(): void {
    this.isScreenScrollable = CommonService.isScreenScrollable(this.adminContainer);
  }

  public logOut(event: Event): void {
    event.preventDefault();

    this.authService.logOut();
    this.router.navigate(["/admin", "login"]);
  }
}
