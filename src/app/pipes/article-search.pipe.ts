import { Pipe, PipeTransform } from '@angular/core';
import { Article } from '../models/create-page.model';

@Pipe({
  name: 'articleSearch'
})
export class ArticleSearchPipe implements PipeTransform {

  transform(articles: Article[], searchRequest: string = ""): Article[] {
    if (!searchRequest.trim()) {
      return articles;
    };

    const lowercasedSearchRequest = searchRequest.toLocaleLowerCase();

    return articles.filter(article => article.header.toLocaleLowerCase().includes(lowercasedSearchRequest));
  }
}
