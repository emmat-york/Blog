export interface ArticleFormData {
    auther: string;
    header: string;
    article: string;
    releaseDate: Date;
    photo: any;
}

export interface Article extends ArticleFormData {
    id: string;
}

export interface CreateArticleResponse {
    name: string;
}
