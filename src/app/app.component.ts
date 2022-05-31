import { Component, OnInit } from '@angular/core';
import { take } from 'rxjs/operators';
import { PostsService } from './services/posts.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  constructor(private readonly postServise: PostsService) { }

  public ngOnInit(): void {
    this.postServise.fetchArticles()
    .pipe(take(1))
    .subscribe(() => {
      console.log("articles fetching has been completed");
    });
  }
}
