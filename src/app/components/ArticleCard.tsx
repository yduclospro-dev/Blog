import { Article } from "@/types/Article";

interface Props {
    article: Article;
}

export default function ArticleCard({ article }: Props) {
    return (
        <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4 hover:shadow-md transition">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                {article.title}
            </h2>
            <p className="text-sm text-gray-500">
                Par {article.author} — {new Date(article.date).toLocaleDateString()}
            </p>
            <p className="mt-2 text-gray-700 dark:text-gray-300">{article.content}</p>
        </div>
    );
}
