export interface ArticleFormData {
    auther: string;
    autherLink: string;
    header: string;
    article: string;
    releaseDate: Date;
    photo: string;
}

export interface Article extends ArticleFormData {
    id: string;
}

export interface CreateArticleResponse {
    name: string;
}

export interface FetchArticlesResponse {
    [articleId: string]: ArticleFormData;
}
