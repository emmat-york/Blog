import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment.prod';
import { ArticleFormData, FbCreateResponse } from '../models/create-page.model';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PostsService {

  constructor(private readonly http: HttpClient) { }

  public createPost(post: ArticleFormData): Observable<ArticleFormData> {
    return this.http.post<FbCreateResponse>(`${environment.fbDbUrl}/posts.json`, post)
    .pipe(map((response: FbCreateResponse) => {
      return {
        ...post,
        id: response.name,
        articleReleaseDate: new Date(post.articleReleaseDate),
      };
    }));
  }

  public getAllPosts(): Observable<ArticleFormData[]> {
    return this.http.get(`${environment.fbDbUrl}/posts.json`)
    .pipe(
      map((response) => {
      if (Object.keys(response).length === 0) { // make helper for check ampty array
        return [];
      };

      return Object.entries(response).reduce((posts, [postId, postData]): any => {
        const mappedPostData: ArticleFormData = {
          ...postData,
          id: postId,
          articleReleaseDate: new Date(postData.articleReleaseDate),
        };

        return [...posts, mappedPostData];
      }, []);
    }));
  }

  public removePost(postId: string | undefined): Observable<void> {
    return this.http.delete<void>(`${environment.fbDbUrl}/posts/${postId}.json`)
  }
}
