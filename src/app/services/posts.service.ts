import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Article, ArticleFormData, CreateArticleResponse } from '../models/create-page.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private readonly http: HttpClient) { }

  public createArticle(post: ArticleFormData): Observable<CreateArticleResponse> {
    return this.http.post<CreateArticleResponse>(`${environment.fbDbUrl}/posts.json`, post);
  }

  public fetchArticles(): Observable<Article[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
    .pipe(
      map((response) => {
      if (Object.keys(response).length === 0) {
        return [];
      };

      return Object.entries(response).reduce((articles, [articleId, article]): any => {
        const mappedArticle: ArticleFormData = {
          ...article,
          id: articleId,
          articleReleaseDate: new Date(article.releaseDate),
        };

        return [...articles, mappedArticle];
      }, []);
    }));
  }

  public removeArticle(articleId: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${articleId}.json`)
  }
}
