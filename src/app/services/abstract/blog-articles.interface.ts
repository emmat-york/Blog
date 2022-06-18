import { Observable } from "rxjs";
import { Article, ArticleFormData, CreateArticleResponse } from "src/app/models/article.model";

export abstract class BlogArticles {
    public abstract createArticle(article: ArticleFormData): Observable<CreateArticleResponse>;

    public abstract fetchArticles(): Observable<any>;

    public abstract getArticleById(articleId: string): Observable<Article>;

    public abstract updateArticle(updatedArticle: Article): Observable<Article>;

    public abstract removeArticle(articleId: string): Observable<void>;
}
