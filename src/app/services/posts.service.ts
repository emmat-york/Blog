import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Article, ArticleFormData, CreateArticleResponse, FetchArticlesResponse } from '../models/create-page.model';
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
      if (!response) {
        return [];
      };

      return Object.entries((response) as FetchArticlesResponse).reduce((articles, [articleId, article]): any => {
        const mappedArticle: Article = {
          ...article,
          id: articleId,
          releaseDate: new Date(article.releaseDate),
        };

        return [...articles, mappedArticle];
      }, []);
    }));
  }

  public getArticleById(articleId: string): Observable <Article> {
    return this.http.get<ArticleFormData>(`${environment.fbDbUrl}/posts/${articleId}.json`)
    .pipe(map((article) => {
      const mappedArticle: Article = {
        ...article,
        id: articleId,
        releaseDate: new Date(article.releaseDate),
      };

      return mappedArticle;
    }));
  }

  public updateArticle(updatedArticle: Article): Observable <Article> {
    return this.http.patch<Article>(`${environment.fbDbUrl}/posts/${updatedArticle.id}.json`, updatedArticle);
  }

  public removeArticle(articleId: string): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${articleId}.json`)
  }
}
