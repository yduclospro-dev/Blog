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

export const useArticleStore = create<ArticleStore>()(
    persist(
        (set, get) => ({
            articles: [],
            fetchArticles: () => {},
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
