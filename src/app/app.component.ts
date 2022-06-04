import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { ArticleService } from './services/article.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly articleService: ArticleService) { }

  public ngOnInit(): void {
    this.articleService.fetchArticles()
    .pipe(take(1))
    .subscribe(() => {
      console.log("articles fetching has been completed");
    });
  }
}
