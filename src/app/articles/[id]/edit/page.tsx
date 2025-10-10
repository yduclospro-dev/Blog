"use client";

import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/stores/articlesStore";
import { useState } from "react";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const { getArticleById, updateArticle } = useArticleStore();

  const article = getArticleById(Number(id));
  const [form, setForm] = useState({
    title: article?.title || "",
    content: article?.content || "",
  });

  if (!article) {
    return <p className="text-center mt-20 text-gray-600">Article introuvable.</p>;
  }

  const handleSave = () => {
    updateArticle(article.id, form);
    router.push(`/articles/${article.id}`);
  };

  return (
    <div className="bg-gray-50 min-h-screen py-16 px-10 md:px-20 lg:px-32">
      <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
        <h1 className="text-3xl font-bold mb-6 text-gray-900">
          Modifier l’article
        </h1>

        <input
          type="text"
          value={form.title}
          onChange={(e) => setForm({ ...form, title: e.target.value })}
          className="w-full border rounded-md p-3 mb-6 text-gray-800"
        />

        <textarea
          rows={8}
          value={form.content}
          onChange={(e) => setForm({ ...form, content: e.target.value })}
          className="w-full border rounded-md p-3 mb-6 text-gray-800"
        />

        <div className="flex justify-end gap-4">
          <button
            onClick={() => router.push(`/articles/${article.id}`)}
            className="px-5 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 cursor-pointer"
          >
            Annuler
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 cursor-pointer"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
