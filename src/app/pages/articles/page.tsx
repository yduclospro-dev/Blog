"use client";

import { useEffect } from "react";
import { useArticleStore } from "@/store/articlesStore";
import ArticleCard from "@/components/ArticleCard";

export default function ArticlesPage() {
    const { articles, fetchArticles } = useArticleStore();

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return (
        <div className="p-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
            <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-6">
                Liste des articles
            </h1>

            {articles.length === 0 ? (
                <p className="text-gray-600 dark:text-gray-400">Aucun article disponible.</p>
            ) : (
                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {articles.map((article) => (
                        <ArticleCard key={article.id} article={article} />
                    ))}
                </div>
            )}
        </div>
    );
}
