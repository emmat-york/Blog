import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'wordsSlicer'
})
export class WordsSlicerPipe implements PipeTransform {

  transform(article: string): string {
    const characters: string = "!@#$%^&*()_-+=:;.,/?§±<>~{}[]\|";

    const articleMappedInArray = article.split(" ");
    const slicedArray = articleMappedInArray.slice(0, 32);

    const slicedArticle = slicedArray.join(" ") + "...";

    return slicedArticle;
  }
}
