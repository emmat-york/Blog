import { Observable } from "rxjs";
import { Article, ArticleFormData, CreateArticleResponse } from "src/app/models/article.model";

export abstract class ArticlesStorageAPI {
    public abstract fetchArticles(): void;

    public abstract createArticle(article: ArticleFormData): Observable<CreateArticleResponse>;

    public abstract updateArticle(updatedArticle: Article): Observable<Article>;

    public abstract removeArticle(articleId: string): Observable<void>;
}
