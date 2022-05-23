import { Component, Input } from '@angular/core';
import { Article } from 'src/app/models/create-page.model';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss']
})
export class PostComponent {
  @Input() public article: Article;
}
