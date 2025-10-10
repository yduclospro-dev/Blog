"use client";

import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/stores/articlesStore";
import Link from "next/link";
import { useState, useEffect } from "react";
import ConfirmModal from "@/components/ConfirmModal";

export default function ArticleDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getArticleById, deleteArticle } = useArticleStore();
    const [showConfirm, setShowConfirm] = useState(false);
    const article = getArticleById(Number(id));

    useEffect(() => {
        document.body.style.overflow = showConfirm ? "hidden" : "auto";
    }, [showConfirm]);

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-center text-gray-500 text-lg">Article introuvable.</p>
            </div>
        );
    }

    const confirmDelete = () => {
        deleteArticle(article.id);
        setShowConfirm(false);
        router.push("/articles");
    };

    const cancelDelete = () => {
        setShowConfirm(false);
    };

    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-6 md:px-20 lg:px-32">
            <div className="max-w-3xl mx-auto bg-white p-10 rounded-2xl shadow-lg border border-gray-100 relative">
                <div className="mb-6 flex items-center justify-between">
                    <button
                        onClick={() => router.push("/articles")}
                        className="text-sm text-blue-600 hover:text-blue-800 transition cursor-pointer"
                    >
                        ← Retour à la liste
                    </button>

                    <div className="flex gap-4 text-sm">
                        <Link
                            href={`/articles/${article.id}/edit`}
                            className="text-blue-600 hover:text-blue-800 transition cursor-pointer"
                        >
                            ✏️ Modifier
                        </Link>
                        <button
                            onClick={() => setShowConfirm(true)}
                            className="text-red-500 hover:text-red-700 transition cursor-pointer"
                        >
                            🗑️ Supprimer
                        </button>
                    </div>
                </div>

                <article>
                    <h1 className="text-4xl font-extrabold text-gray-900 mb-4 leading-tight">
                        {article.title}
                    </h1>

                    <div className="text-sm text-gray-500 mb-8 flex justify-between">
                        <span>✍️ {article.author}</span>
                        <span>
                            📅{" "}
                            {new Date(article.date).toLocaleDateString("fr-FR", {
                                day: "numeric",
                                month: "long",
                                year: "numeric",
                            })}
                        </span>
                    </div>

                    <div className="prose prose-lg max-w-none text-justify text-gray-900">
                        {article.content.split("\n").map((paragraph, i) => (
                            <p key={i} className="mb-4">{paragraph}</p>
                        ))}
                    </div>
                </article>
            </div>

            {showConfirm && (
                <ConfirmModal
                    message="Cette action est irréversible."
                    onConfirm={confirmDelete}
                    onCancel={cancelDelete}
                />
            )}
        </div>
    );
}
