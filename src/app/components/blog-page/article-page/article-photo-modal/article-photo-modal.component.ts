import { Component, ViewContainerRef } from '@angular/core';

@Component({
  selector: 'app-article-photo-modal',
  templateUrl: './article-photo-modal.component.html',
  styleUrls: ['./article-photo-modal.component.scss']
})
export class ArticlePhotoModalComponent {
  articleImagePath: string;
  viewContainerRef: ViewContainerRef;

  public onCloseModal(event: any): void {
    if (event.srcElement.className === "window-background") {
      this.viewContainerRef.clear();
    }
  }
}
