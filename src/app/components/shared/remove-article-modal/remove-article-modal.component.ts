import { Component, Input, OnInit } from '@angular/core';
import { catchError, take } from 'rxjs/operators';
import { RemoveArticleModalData } from 'src/app/models/article.model';
import { AlertService } from 'src/app/services/alert.service';
import { ArticleService } from 'src/app/services/article.service';

@Component({
  selector: 'app-remove-article-modal',
  templateUrl: './remove-article-modal.component.html',
  styleUrls: ['../../../../styles/modals.scss']
})
export class RemoveArticleModalComponent implements OnInit {
  @Input() public modalData: RemoveArticleModalData;
  private articleData: RemoveArticleModalData;

  constructor(
    private readonly articlesService: ArticleService,
    private readonly alertService: AlertService,
  ) { }

  public ngOnInit(): void {
    this.articleData = this.modalData;
  }

  public onCancel(): void {
    this.modalData.viewContainerRef.clear();
  }

  public onRemoveArticle(): void {
    const { articleId, articles } = this.articleData;

    this.articlesService.removeArticle(articleId)
    .pipe(
      take(1),
      catchError((error) => {
        console.log(error);
        this.alertService.error("Something went wrong while removing the article!");
        return null;
      }),
    )
    .subscribe(() => {
      const newArticles = articles.filter(article => article.id !== articleId);
      this.articlesService.articlesStorage$.next(newArticles);
      this.alertService.success("Article has been seccessfully removed!");
      this.modalData.viewContainerRef.clear();
    });
  }
}
