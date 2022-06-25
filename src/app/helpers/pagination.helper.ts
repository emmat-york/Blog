import { Article } from "../models/article.model";
import { PaginationValues } from "../models/pagination.model";

export function getPaginationValues(articles: Article[], pageNumber: number): PaginationValues {
    // Example: Articles count - 11. Page - 2.
    const firstIndex = (pageNumber - 1) * 10; // (2 - 1) * 10 = 10 - First index.
    const possibleLastIndex = pageNumber * 10; // 2 * 10 = 20 - Max count of articles on the page.

    const pageArticlesLenght = articles
    .slice(firstIndex, possibleLastIndex).length; // Sliced articles in this range. 

    return {
      valueFrom: firstIndex, // Index of the first article - 10.
      valueTo: firstIndex + pageArticlesLenght, // The last article index - 10 + 1 = 11.
    };
};
