import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit {

  constructor(private readonly router: Router) { }

  ngOnInit(): void {
  }

  public logOut(event: Event): void {
    event.preventDefault();
    this.router.navigate(["/admin", "login"]);
  }

}
