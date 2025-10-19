"use client";

import { useEffect } from "react";
import { useArticleStore } from "@/stores/articlesStore";
import { useUserStore } from "@/stores/userStore";
import ArticlesListPresenter from "../presenters/ArticlesListPresenter";

export default function ArticlesListContainer() {
    const { articles, fetchArticles } = useArticleStore();
    const { isAuthenticated } = useUserStore();

    useEffect(() => {
        fetchArticles();
    }, [fetchArticles]);

    return (
        <ArticlesListPresenter 
            articles={articles}
            isAuthenticated={isAuthenticated}
        />
    );
}
