import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models/article.model';
import { PaginationValues } from '../models/pagination.model';

@Pipe({
  name: 'pagination'
})
export class PaginationPipe implements PipeTransform {
  public transform(articles: Article[], pagination: PaginationValues): Article[] {
    return articles.slice(pagination.valueFrom, pagination.valueTo);
  }
}
