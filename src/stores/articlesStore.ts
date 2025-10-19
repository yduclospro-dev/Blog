"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Article } from "@/types/Article";

interface ArticleStore {
    articles: Article[];
    getArticleById: (id: string) => Article | undefined;
    getLatestArticles: (limit: number) => Article[];
    addArticle: (articleData: Omit<Article, "id" | "date">) => void;
    updateArticle: (id: string, updatedData: Partial<Article>) => void;
    deleteArticle: (id: string) => void;
}

export const useArticleStore = create<ArticleStore>()(
    persist(
        (set, get) => ({
            articles: [],
            getArticleById: (id) => get().articles.find((a) => a.id === id),
            getLatestArticles: (limit) => {
                const sorted = [...get().articles].sort((a, b) => 
                    new Date(b.date).getTime() - new Date(a.date).getTime()
                );
                return sorted.slice(0, limit);
            },
            addArticle: (articleData) => {
                const newArticle: Article = {
                    ...articleData,
                    id: crypto.randomUUID(),
                    date: new Date().toISOString().split("T")[0],
                };
                set({ articles: [...get().articles, newArticle] });
            },
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
