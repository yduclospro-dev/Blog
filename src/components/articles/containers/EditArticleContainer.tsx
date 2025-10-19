"use client";

import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/stores/articlesStore";
import { useUserStore } from "@/stores/userStore";
import { useState } from "react";
import ForbiddenAccess from "@/components/ForbiddenAccess";
import EditArticlePresenter from "../presenters/EditArticlePresenter";

export default function EditArticleContainer() {
  const { id } = useParams();
  const router = useRouter();
  const { getArticleById, updateArticle } = useArticleStore();
  const { currentUser } = useUserStore();

  const article = getArticleById(String(id));
  const [formData, setFormData] = useState({
    title: article?.title || "",
    content: article?.content || "",
  });

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (article) {
      updateArticle(article.id, {
        title: formData.title,
        content: formData.content
      });
      router.push(`/articles/${article.id}`);
    }
  };

  const handleCancel = () => {
    if (article) {
      router.push(`/articles/${article.id}`);
    }
  };

  if (!currentUser) {
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
