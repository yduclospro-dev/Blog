"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
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
        <div className="bg-gray-50 min-h-screen py-16 px-10 md:px-20 lg:px-32">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <button
                    onClick={() => router.push("/articles")}
                    className="text-blue-600 hover:underline mb-6"
                >
                    ← Retour
                </button>

                <h1 className="text-3xl font-bold mb-6 text-gray-900">
                    Créer un nouvel article
                </h1>

                <input
                    type="text"
                    placeholder="Titre"
                    value={form.title}
                    onChange={(e) => setForm({ ...form, title: e.target.value })}
                    className="w-full border rounded-md p-3 mb-4 text-gray-800"
                />

                <input
                    type="text"
                    placeholder="Auteur"
                    value={form.author}
                    onChange={(e) => setForm({ ...form, author: e.target.value })}
                    className="w-full border rounded-md p-3 mb-4 text-gray-800"
                />

                <input
                    type="date"
                    value={form.date}
                    onChange={(e) => setForm({ ...form, date: e.target.value })}
                    className="w-full border rounded-md p-3 mb-4 text-gray-800"
                />

                <textarea
                    rows={8}
                    placeholder="Contenu de l’article..."
                    value={form.content}
                    onChange={(e) => setForm({ ...form, content: e.target.value })}
                    className="w-full border rounded-md p-3 mb-6 text-gray-800"
                />

                <div className="flex justify-end gap-4">
                    <button
                        onClick={() => router.push("/articles")}
                        className="px-5 py-2 border border-gray-400 rounded-md text-gray-600 hover:bg-gray-100"
                    >
                        Annuler
                    </button>

                    <button
                        onClick={handleSave}
                        className="px-5 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                        Enregistrer
                    </button>
                </div>
            </div>
        </div>
    );
}
