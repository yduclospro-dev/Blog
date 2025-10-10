"use client";

import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/stores/articlesStore";
import { useState, useRef, useEffect } from "react";

export default function EditArticlePage() {
  const { id } = useParams();
  const router = useRouter();
  const { getArticleById, updateArticle } = useArticleStore();

  const article = getArticleById(Number(id));
  const [form, setForm] = useState({
    title: article?.title || "",
    author: article?.author || "",
    date: article?.date || new Date().toISOString().split("T")[0],
    content: article?.content || "",
  });

  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";

      const maxHeight = 384; // 24rem = Tailwind max-h-96
      textarea.style.overflow = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [form.content]);

  if (!article) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-center text-gray-500 text-lg">Article introuvable.</p>
      </div>
    );
  }

  const handleSave = () => {
    updateArticle(article.id, form);
    router.push(`/articles/${article.id}`);
  };

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-6 md:px-20 lg:px-32">
      <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">📝 Modifier l’article</h1>

        <div className="space-y-6">
          <input
            type="text"
            placeholder="Titre"
            value={form.title}
            onChange={(e) => setForm({ ...form, title: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="text"
            placeholder="Auteur"
            value={form.author}
            onChange={(e) => setForm({ ...form, author: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="date"
            value={form.date}
            onChange={(e) => setForm({ ...form, date: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <textarea
            ref={textareaRef}
            placeholder="Contenu de l’article..."
            value={form.content}
            onChange={(e) => setForm({ ...form, content: e.target.value })}
            className="w-full border border-gray-300 rounded-md p-4 text-gray-900 shadow-sm resize-none min-h-32 max-h-100 text-justify focus:outline-none focus:ring-2 focus:ring-blue-500"
            rows={1}
          />
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <button
            onClick={() => router.push(`/articles/${article.id}`)}
            className="px-5 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100 transition cursor-pointer"
          >
            Annuler
          </button>

          <button
            onClick={handleSave}
            className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition cursor-pointer"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
}
