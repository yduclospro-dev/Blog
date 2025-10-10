import { create } from "zustand";
import { Article } from "@/types/Article";

interface ArticleStore {
    articles: Article[];
    fetchArticles: () => void;
    getArticleById: (id: number) => Article | undefined;
    updateArticle: (id: number, updatedData: Partial<Article>) => void;
    deleteArticle: (id: number) => void;
}

export const useArticleStore = create<ArticleStore>((set, get) => ({
    articles: [],
    fetchArticles: () =>
        set({
            articles: [
                {
                    id: 1,
                    title: "Article 1",
                    author: "John Doe",
                    date: "2025-10-08",
                    content: "Un aperçu de l'article 1.",
                },
                {
                    id: 2,
                    title: "Article 2",
                    author: "John Smith",
                    date: "2025-10-09",
                    content: "Un apperçu de l'article 2.",
                },
                {
                    id: 3,
                    title: "Article 3",
                    author: "Loris Nève",
                    date: "2025-10-10",
                    content: "Un apperçu de l'article 3.",
                },
            ],
        }),

    getArticleById: (id) => get().articles.find((a) => a.id === id),

    updateArticle: (id, updatedData) =>
        set({
            articles: get().articles.map((a) =>
                a.id === id ? { ...a, ...updatedData } : a
            ),
        }),

    deleteArticle: (id) =>
        set({
            articles: get().articles.filter((a) => a.id !== id),
        }),
}));