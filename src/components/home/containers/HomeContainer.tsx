"use client";
import { useUserStore } from "@/stores/userStore";
import { useArticleStore } from "@/stores/articlesStore";
import HomePresenter from "../presenters/HomePresenter";

export default function HomeContainer() {
  const { currentUser, isAuthenticated } = useUserStore();
  const { getLatestArticles } = useArticleStore();

  const featuredArticles = getLatestArticles(3);

  return (
    <HomePresenter
      currentUser={currentUser}
      isAuthenticated={isAuthenticated}
      featuredArticles={featuredArticles}
    />
  );
}