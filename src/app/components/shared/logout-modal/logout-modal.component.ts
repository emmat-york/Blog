import { Component } from '@angular/core';
import { BlogService } from 'src/app/services/blog.service';

@Component({
  selector: 'app-logout-modal',
  templateUrl: './logout-modal.component.html',
  styleUrls: ['../../../../styles/modals.scss']
})
export class LogoutModalComponent {

  constructor(private readonly blogService: BlogService) {}

  public onCancel(): void {
    this.blogService.onModalClose$.next("Cancel");
  }

  public onSignOut(): void {
    this.blogService.onModalClose$.next("SignOut");
  }
}
