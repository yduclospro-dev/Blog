"use client";
import { useEffect } from "react";
import { useUserStore } from "@/stores/userStore";
import { useArticleStore } from "@/stores/articlesStore";
import HomePresenter from "../presenters/HomePresenter";

export default function HomeContainer() {
  const { currentUser, isAuthenticated } = useUserStore();
  const { articles, fetchArticles } = useArticleStore();

  useEffect(() => {
    fetchArticles();
  }, [fetchArticles]);

  const featuredArticles = articles.slice(0, 3);

  return (
    <HomePresenter
      currentUser={currentUser}
      isAuthenticated={isAuthenticated}
      featuredArticles={featuredArticles}
    />
  );
}