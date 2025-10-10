"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Article } from "@/types/Article";

interface ArticleStore {
    articles: Article[];
    fetchArticles: () => void;
    getArticleById: (id: number) => Article | undefined;
    addArticle: (newArticle: Article) => void;
    updateArticle: (id: number, updatedData: Partial<Article>) => void;
    deleteArticle: (id: number) => void;
}

const defaultArticles: Article[] = [
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
        content: "Un aperçu de l'article 2.",
    },
    {
        id: 3,
        title: "Article 3",
        author: "Loris Nève",
        date: "2025-10-10",
        content: "Un aperçu de l'article 3.",
    },
];

export const useArticleStore = create<ArticleStore>()(
    persist(
        (set, get) => ({
            articles: [],
            fetchArticles: () => {
                const existing = get().articles;
                if (existing.length === 0) set({ articles: defaultArticles });
            },
            getArticleById: (id) => get().articles.find((a) => a.id === id),
            addArticle: (newArticle) =>
                set({ articles: [...get().articles, newArticle] }),
            updateArticle: (id, updatedData) =>
                set({
                    articles: get().articles.map((a) =>
                        a.id === id ? { ...a, ...updatedData } : a
                    ),
                }),
            deleteArticle: (id) =>
                set({ articles: get().articles.filter((a) => a.id !== id) }),
        }),
        { name: "articles-storage" }
    )
);
