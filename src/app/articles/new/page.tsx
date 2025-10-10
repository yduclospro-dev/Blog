"use client";

import { useRouter } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import { useArticleStore } from "@/stores/articlesStore";

export default function NewArticlePage() {
    const router = useRouter();
    const { addArticle } = useArticleStore();

    const [form, setForm] = useState({
        title: "",
        author: "",
        date: new Date().toISOString().split("T")[0],
        content: "",
    });

    const textareaRef = useRef<HTMLTextAreaElement>(null);

    useEffect(() => {
        const textarea = textareaRef.current;
        if (textarea) {
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";

            const maxHeight = 384;
            textarea.style.overflow = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
        }
    }, [form.content]);

    const handleSave = () => {
        if (!form.title || !form.author || !form.content) {
            alert("Tous les champs sont requis !");
            return;
        }

        const newArticle = {
            id: Date.now(),
            ...form,
        };

        addArticle(newArticle);
        router.push("/articles");
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-6 md:px-20 lg:px-32">
            <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100">
                <button
                    onClick={() => router.push("/articles")}
                    className="text-blue-600 hover:text-blue-800 mb-6 text-sm transition cursor-pointer"
                >
                    ← Retour à la liste
                </button>

                <h1 className="text-4xl font-extrabold text-gray-900 mb-8">📰 Créer un nouvel article</h1>

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
                        className="w-full border border-gray-300 rounded-md p-4 text-gray-900 shadow-sm resize-none min-h-45 max-h-96 text-justify focus:outline-none focus:ring-2 focus:ring-blue-500"
                        rows={1}
                    />
                </div>

                <div className="flex justify-end gap-4 mt-10">
                    <button
                        onClick={() => router.push("/articles")}
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
