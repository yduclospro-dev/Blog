import { Article } from "@/types/Article";
import { Card } from "@/components/ui";

interface Props {
    article: Article;
}

export default function ArticleCard({ article }: Props) {
    const preview =
        article.content.length > 120
            ? article.content.slice(0, 120) + "..."
            : article.content;

    return (
        <Card variant="default" padding="none" hover className="overflow-hidden flex flex-col">
            <div className="h-32 w-full bg-gradient-to-r from-blue-400 to-blue-300"></div>

            <div className="p-5 flex flex-col justify-between flex-grow">
                <div>
                    <h2 className="text-lg font-semibold text-gray-900 mb-2 line-clamp-2">
                        {article.title}
                    </h2>
                    <p className="text-gray-600 text-sm leading-snug">{preview}</p>
                </div>

                <div className="mt-4 space-y-3">
                    <div className="flex items-center justify-between">
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
        </Card>
    );
}
