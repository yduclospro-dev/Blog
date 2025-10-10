"use client";

import Link from "next/link";
import { useEffect } from "react";
import { useArticleStore } from "../../stores/articlesStore";
import ArticleCard from "../../components/ArticleCard";

export default function ArticlesPage() {
    const { articles, fetchArticles, deleteArticle } = useArticleStore();

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-10 md:px-20 lg:px-32">
            <div className="max-w-6xl mx-auto text-center mb-16">
                <h1 className="text-4xl font-bold text-gray-900 mb-3">
                    Articles en vedette
                </h1>
                <p className="text-gray-600 text-lg">
                    Découvrez les articles les plus populaires de notre communauté
                </p>
            </div>

            <div className="max-w-6xl mx-auto grid gap-12 sm:grid-cols-2 lg:grid-cols-3 justify-items-center">
                {articles.map((article) => (
                    <div key={article.id} className="w-[90%] sm:w-[85%] md:w-[100%]">
                        <Link href={`/articles/${article.id}`}>
                            <ArticleCard article={article} />
                        </Link>

                        <div className="flex justify-between mt-3">
                            <Link
                                href={`/articles/${article.id}/edit`}
                                className="text-blue-600 hover:underline text-sm"
                            >
                                Modifier
                            </Link>
                            <button
                                onClick={() => deleteArticle(article.id)}
                                className="text-red-500 hover:underline text-sm"
                            >
                                Supprimer
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
