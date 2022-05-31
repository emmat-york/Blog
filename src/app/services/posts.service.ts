import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Article, ArticleFormData, CreateArticleResponse, FetchArticlesResponse } from '../models/create-page.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService implements OnDestroy {
  public articlesStorage$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>(null);

  constructor(private readonly http: HttpClient) { }

  public ngOnDestroy(): void {
    this.articlesStorage$.complete();
  }

  public createArticle(post: ArticleFormData): Observable<CreateArticleResponse> {
    return this.http.post<CreateArticleResponse>(`${environment.fbDbUrl}/posts.json`, post);
  }

  public fetchArticles(): Observable<null> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
    .pipe(
      map((response) => {
      if (!response) {
        return null;
      };

      const mappedArticles = Object.entries((response) as FetchArticlesResponse).reduce((articles, [articleId, article]): Article[] => {
        const mappedArticle: Article = {
          ...article,
          id: articleId,
          releaseDate: new Date(article.releaseDate),
        };

        return [...articles, mappedArticle];
      }, []);

      this.articlesStorage$.next(mappedArticles);
      return null;
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
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${articleId}.json`);
  }
}
