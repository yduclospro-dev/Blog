"use client";

import { useParams, useRouter } from "next/navigation";
import { useArticleStore } from "@/stores/articlesStore";
import { useCommentsStore } from "@/stores/commentsStore";
import { useUserStore } from "@/stores/userStore";
import { useState, useEffect } from "react";
import ArticleDetailPresenter from "../presenters/ArticleDetailPresenter";

export default function ArticleDetailContainer() {
    const { id } = useParams();
    const router = useRouter();
    const { getArticleById, deleteArticle } = useArticleStore();
    const { isAuthenticated, currentUser } = useUserStore();
    const { 
        getCommentsByArticle, 
        addComment, 
        updateComment, 
        deleteComment 
    } = useCommentsStore();
    
    const [showConfirm, setShowConfirm] = useState(false);
    const article = getArticleById(Number(id));
    const comments = article ? getCommentsByArticle(article.id) : [];

    const isAuthor = !!(article && currentUser?.id === article.authorId);

    useEffect(() => {
        document.body.style.overflow = showConfirm ? "hidden" : "auto";
    }, [showConfirm]);

    const handleDelete = () => {
        if (article) {
            deleteArticle(article.id);
            setShowConfirm(false);
            router.push("/articles");
        }
    };

    const handleCancelDelete = () => {
        setShowConfirm(false);
    };

    const handleShowConfirm = () => {
        setShowConfirm(true);
    };

    const handleBack = () => {
        router.push("/articles");
    };

    const handleAddComment = (content: string) => {
        if (!article || !currentUser) return;
        
        addComment({
            articleId: article.id,
            authorId: currentUser.id,
            authorName: currentUser.username,
            content,
        });
    };

    const handleUpdateComment = (commentId: string, content: string) => {
        updateComment(commentId, content);
    };

    const handleDeleteComment = (commentId: string) => {
        deleteComment(commentId);
    };

    if (!article) {
        return (
            <div className="min-h-screen flex items-center justify-center bg-gray-100">
                <p className="text-center text-gray-500 text-lg">Article introuvable.</p>
            </div>
        );
    }

    return (
        <ArticleDetailPresenter
            article={article}
            isAuthenticated={isAuthenticated}
            isAuthor={isAuthor}
            showConfirm={showConfirm}
            onDelete={handleDelete}
            onCancelDelete={handleCancelDelete}
            onShowConfirm={handleShowConfirm}
            onBack={handleBack}
            comments={comments}
            currentUserId={currentUser?.id}
            onAddComment={handleAddComment}
            onUpdateComment={handleUpdateComment}
            onDeleteComment={handleDeleteComment}
        />
    );
}
