import { Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['./logout-modal.component.scss']
})
export class LogoutModalComponent {

  constructor(private blogService: BlogService) {}

  public onCancel(): void {
    this.blogService.onModalClose$.next("Cancel");
  }

  public onSignOut(): void {
    this.blogService.onModalClose$.next("SignOut");
  }
}
