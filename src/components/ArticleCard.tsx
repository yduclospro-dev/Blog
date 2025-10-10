import { Article } from "@/types/Article";

interface Props {
    article: Article;
}

export default function ArticleCard({ article }: Props) {
    const preview =
        article.content.length > 120
            ? article.content.slice(0, 120) + "..."
            : article.content;

    return (
        <div className="bg-white rounded-2xl shadow-md overflow-hidden hover:shadow-lg transition-all duration-300 h-[320px] flex flex-col">
            <div className="h-32 w-full bg-gradient-to-r from-blue-400 to-blue-300"></div>

            <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-snug">{preview}</p>
                </div>

                <div className="flex items-center justify-between mt-4">
                    <div className="flex items-center gap-2">
                        <div className="h-8 w-8 rounded-full bg-blue-500"></div>
                        <span className="text-sm font-medium text-gray-700">
                            {article.author}
                        </span>
                    </div>

                    <span className="text-xs text-gray-500">
                        {new Date(article.date).toLocaleDateString("fr-FR", {
                            day: "numeric",
                            month: "long",
                            year: "numeric",
                        })}
                    </span>
                </div>
            </div>
        </div>
    );
}
