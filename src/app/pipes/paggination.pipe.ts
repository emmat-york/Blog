import { Pipe, PipeTransform } from '@angular/core';
import { PagginationValues } from '../components/blog-page/home-page/home-page.component';
import { Article } from '../models/article.model';

@Pipe({
  name: 'paggination'
})
export class PagginationPipe implements PipeTransform {
  public transform(articles: Article[], paggination: PagginationValues): Article[] {
    return articles.slice(paggination.valueFrom, paggination.valueTo);
  }
}
