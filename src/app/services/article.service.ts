import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, BehaviorSubject } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { Article, ArticleFormData, CreateArticleResponse, FetchArticlesResponse } from '../models/article.model';
import { catchError, map } from 'rxjs/operators';
import { ArticlesDatabaseApi } from './abstract/articles-database.interface';

@Injectable({
  providedIn: 'root'
})
export class ArticleService implements ArticlesDatabaseApi {
  public articlesStorage$: BehaviorSubject<Article[]> = new BehaviorSubject<Article[]>(null);

  constructor(private readonly http: HttpClient) {
    this.fetchArticles();
  }

  public fetchArticles(): void {
    this.http.get(`${environment.baseStorageUrl}/articles.json`)
      .pipe(
        map((articlesFromStorage) => {
          const mappedArticles = Object.entries((articlesFromStorage) as FetchArticlesResponse)
            .reduce((articles, [articleId, article]): Article[] => {

              const mappedArticle: Article = {
                ...article,
                id: articleId,
                releaseDate: new Date(article.releaseDate),
              };

              return [...articles, mappedArticle];
            }, []);

            return mappedArticles.reverse();
        }),
        catchError((error) => {
          this.articlesStorage$.next([]);
          throw new Error(error);
        }),
      )
      .subscribe((articles) => {
        this.articlesStorage$.next(articles);
        console.log("Articles has been successfuly fethced");
      });
  }

  public createArticle(article: ArticleFormData): Observable<CreateArticleResponse> {
    return this.http.post<CreateArticleResponse>(`${environment.baseStorageUrl}/articles.json`, article);
  }

  public updateArticle(updatedArticle: Article): Observable<Article> {
    return this.http.patch<Article>(`${environment.baseStorageUrl}/articles/${updatedArticle.id}.json`, updatedArticle);
  }

  public removeArticle(articleId: string): Observable<void> {
    return this.http.delete<void>(`${environment.baseStorageUrl}/articles/${articleId}.json`);
  }
}
