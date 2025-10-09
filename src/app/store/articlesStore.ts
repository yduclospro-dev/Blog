import { create } from "zustand";
import { Article } from "@/types/Article";

interface ArticleStore {
    articles: Article[];
    fetchArticles: () => void;
}

export const useArticleStore = create<ArticleStore>((set) => ({
    articles: [],
    fetchArticles: () =>
        set({
            articles: [
                {
                    id: 1,
                    title: "Test 1",
                    author: "John Doe",
                    date: "2025-10-08",
                    content: "Un aperçu de l'article 1.",
                },
                {
                    id: 2,
                    title: "Test 2",
                    author: "John Smith",
                    date: "2025-10-09",
                    content: "Un apperçu de l'article 2.",
                },
            ],
        }),
}));
