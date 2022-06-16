import { HttpClient } from '@angular/common/http';
import { Injectable, OnDestroy } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Article, ArticleFormData, CreateArticleResponse, FetchArticlesResponse } from '../models/article.model';
import { catchError, map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ArticleService implements OnDestroy {
  public articlesStorage$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>([]);

  constructor(private readonly http: HttpClient) { }

  public ngOnDestroy(): void {
    this.articlesStorage$.complete();
  }

  public createArticle(article: ArticleFormData): Observable<CreateArticleResponse> {
    return this.http.post<CreateArticleResponse>(`${environment.baseStorageUrl}/articles.json`, article);
  }

  public fetchArticles(): Observable<any> {
    return this.http.get(`${environment.baseStorageUrl}/articles.json`)
      .pipe(
        tap((response) => {
          const mappedArticles = Object.entries((response) as FetchArticlesResponse)
            .reduce((articles, [articleId, article]): Article[] => {

              const mappedArticle: Article = {
                ...article,
                id: articleId,
                releaseDate: new Date(article.releaseDate),
              };

              return [...articles, mappedArticle];
            }, []);

          this.articlesStorage$.next(mappedArticles);
        }),
        catchError(() => {
          return [];
        }),
      );
  }

  public getArticleById(articleId: string): Observable<Article> {
    return this.http.get<ArticleFormData>(`${environment.baseStorageUrl}/articles/${articleId}.json`)
      .pipe(
        map((article) => {
          const mappedArticle: Article = {
            ...article,
            id: articleId,
            releaseDate: new Date(article.releaseDate),
          };

          return mappedArticle;
        }));
  }

  public updateArticle(updatedArticle: Article): Observable<Article> {
    return this.http.patch<Article>(`${environment.baseStorageUrl}/articles/${updatedArticle.id}.json`, updatedArticle);
  }

  public removeArticle(articleId: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseStorageUrl}/articles/${articleId}.json`);
  }
}
