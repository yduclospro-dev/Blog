"use client";

import { useArticleStore } from "@/stores/articlesStore";
import { useUserStore } from "@/stores/userStore";
import ArticlesListPresenter from "../presenters/ArticlesListPresenter";

export default function ArticlesListContainer() {
    const { articles } = useArticleStore();
    const { isAuthenticated } = useUserStore();

    return (
        <ArticlesListPresenter 
            articles={articles}
            isAuthenticated={isAuthenticated}
        />
    );
}
