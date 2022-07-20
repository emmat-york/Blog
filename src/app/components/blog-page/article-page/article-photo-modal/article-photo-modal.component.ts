import { Component } from '@angular/core';
import { ArticalPhotoModal } from 'src/app/models/article.model';

@Component({
  selector: 'app-article-photo-modal',
  templateUrl: './article-photo-modal.component.html',
  styleUrls: ['./article-photo-modal.component.scss']
})
export class ArticlePhotoModalComponent {
  public modalData: ArticalPhotoModal;

  public onCloseModal(event: any): void {
    if (event.srcElement.className === "window-background") {
      this.modalData.viewContainerRef.clear();
    }
  }
}
