"use client";

import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/store/articlesStore";
import Link from "next/link";

export default function ArticleDetailPage() {
    const { id } = useParams();
    const router = useRouter();
    const { getArticleById, deleteArticle } = useArticleStore();
    const article = getArticleById(Number(id));

    if (!article) {
        return <p className="text-center mt-20 text-gray-600">Article introuvable.</p>;
    }

    return (
        <div className="bg-gray-50 min-h-screen py-16 px-10 md:px-20 lg:px-32">
            <div className="max-w-4xl mx-auto bg-white p-8 rounded-xl shadow-md">
                <h1 className="text-3xl font-bold mb-4">{article.title}</h1>
                <p className="text-gray-600 mb-8">{article.content}</p>

                <div className="flex justify-between text-sm text-gray-500">
                    <p>Par {article.author}</p>
                    <p>
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </p>
                </div>

                <div className="flex justify-end mt-8 gap-6">
                    <Link
                        href={`/pages/articles/${article.id}/edit`}
                        className="text-blue-600 hover:underline"
                    >
                        Modifier
                    </Link>
                    <button
                        onClick={() => {
                            deleteArticle(article.id);
                            router.push("/pages/articles");
                        }}
                        className="text-red-500 hover:underline"
                    >
                        Supprimer
                    </button>
                </div>
            </div>
        </div>
    );
}
