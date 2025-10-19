"use client";

import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/stores/articlesStore";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useState } from "react";
import ForbiddenAccess from "@/components/ForbiddenAccess";
import EditArticlePresenter from "../presenters/EditArticlePresenter";

export default function EditArticleContainer() {
  const { id } = useParams();
  const router = useRouter();
  const { getArticleById, updateArticle } = useArticleStore();
  const isAuthenticated = useRequireAuth();

  const article = getArticleById(Number(id));
  const [formData, setFormData] = useState({
    title: article?.title || "",
    date: article?.date || new Date().toISOString().split("T")[0],
    content: article?.content || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (article) {
      updateArticle(article.id, {
        ...formData,
        author: article.author,
      });
      router.push(`/articles/${article.id}`);
    }
  };

  const handleCancel = () => {
    if (article) {
      router.push(`/articles/${article.id}`);
    }
  };

  if (!isAuthenticated) {
    return (
      <ForbiddenAccess 
        message="Vous devez être connecté pour modifier cet article."
      />
    );
  }

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-500 text-lg">Article introuvable.</p>
      </div>
    );
  }

  return (
    <EditArticlePresenter
      formData={formData}
      onInputChange={handleInputChange}
      onSave={handleSave}
      onCancel={handleCancel}
    />
  );
}
