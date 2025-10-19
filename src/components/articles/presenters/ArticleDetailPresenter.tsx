import { Article } from "@/types/Article";
import ConfirmModal from "@/components/ConfirmModal";
import { Button, ButtonLink, Card } from "@/components/ui";

interface ArticleDetailPresenterProps {
    article: Article;
    isAuthenticated: boolean;
    showConfirm: boolean;
    onDelete: () => void;
    onCancelDelete: () => void;
    onShowConfirm: () => void;
    onBack: () => void;
}

export default function ArticleDetailPresenter({
    article,
    isAuthenticated,
    showConfirm,
    onDelete,
    onCancelDelete,
    onShowConfirm,
    onBack,
}: ArticleDetailPresenterProps) {
    return (
        <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-6 md:px-20 lg:px-32">
            <Card variant="default" padding="lg" className="max-w-3xl mx-auto relative">
                <div className="mb-6 flex items-center justify-between">
                    <Button
                        variant="ghost"
                        onClick={onBack}
                        className="text-sm"
                        label="← Retour à la liste"
                    />

                    {isAuthenticated && (
                        <div className="flex gap-3">
                            <ButtonLink
                                href={`/articles/${article.id}/edit`}
                                variant="primary"
                                className="p-2.5"
                                label=""
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                    </svg>
                                }
                            />
                            <Button
                                variant="danger"
                                onClick={onShowConfirm}
                                className="p-2.5"
                                label=""
                                icon={
                                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                    </svg>
                                }
                            />
                        </div>
                    )}
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
            </Card>

            {showConfirm && (
                <ConfirmModal
                    message="Cette action est irréversible."
                    onConfirm={onDelete}
                    onCancel={onCancelDelete}
                />
            )}
        </div>
    );
}
