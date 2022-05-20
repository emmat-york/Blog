import { Pipe, PipeTransform } from '@angular/core';
import { ArticleFormData } from '../models/create-page.model';

@Pipe({
  name: 'postSearch'
})
export class PostSearchPipe implements PipeTransform {

  transform(posts: ArticleFormData[], searchRequest: string = ""): ArticleFormData[] {
    if (!searchRequest.trim()) {
      return posts;
    };
    const lowercasedSearchRequest = searchRequest.toLocaleLowerCase();

    return posts.filter(post => post.header.toLocaleLowerCase().includes(lowercasedSearchRequest));
  }
}
