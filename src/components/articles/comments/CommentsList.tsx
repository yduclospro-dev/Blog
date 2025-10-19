"use client";

import { useState, useEffect } from "react";
import { Comment } from "@/types/Comment";
import { Button, Textarea } from "@/components/ui";
import ConfirmModal from "@/components/ConfirmModal";

interface CommentsListProps {
    comments: Comment[];
    currentUserId?: string;
    onDelete: (commentId: string) => void;
    onUpdate: (commentId: string, content: string) => void;
}

export default function CommentsList({
    comments,
    currentUserId,
    onDelete,
    onUpdate,
}: CommentsListProps) {
    const [editingId, setEditingId] = useState<string | null>(null);
    const [editContent, setEditContent] = useState("");
    const [deleteConfirmId, setDeleteConfirmId] = useState<string | null>(null);

    useEffect(() => {
        document.body.style.overflow = deleteConfirmId ? "hidden" : "auto";
        return () => {
            document.body.style.overflow = "auto";
        };
    }, [deleteConfirmId]);

    const startEditing = (comment: Comment) => {
        setEditingId(comment.id);
        setEditContent(comment.content);
    };

    const cancelEditing = () => {
        setEditingId(null);
        setEditContent("");
    };

    const saveEdit = (commentId: string) => {
        if (!editContent.trim()) {
            alert("Le commentaire ne peut pas être vide !");
            return;
        }
        onUpdate(commentId, editContent);
        cancelEditing();
    };

    const handleShowDeleteConfirm = (commentId: string) => {
        setDeleteConfirmId(commentId);
    };

    const handleConfirmDelete = () => {
        if (deleteConfirmId) {
            onDelete(deleteConfirmId);
            setDeleteConfirmId(null);
        }
    };

    const handleCancelDelete = () => {
        setDeleteConfirmId(null);
    };

    if (comments.length === 0) {
        return (
            <div className="text-center py-8 text-gray-500">
                Aucun commentaire pour le moment. Soyez le premier à commenter !
            </div>
        );
    }

    return (
        <div className="space-y-4">
            <h3 className="text-xl font-bold text-gray-900 mb-6">
                💬 Commentaires ({comments.length})
            </h3>
            {comments.map((comment) => {
                const isAuthor = currentUserId === comment.authorId;
                const isEditing = editingId === comment.id;

                return (
                    <div
                        key={comment.id}
                        className="bg-gray-50 border border-gray-200 rounded-lg p-5 shadow-sm hover:shadow-md transition-shadow"
                    >
                        <div className="flex justify-between items-start mb-3">
                            <div>
                                <p className="font-semibold text-gray-900">
                                    {comment.authorName}
                                </p>
                                <p className="text-sm text-gray-500">
                                    {new Date(comment.date).toLocaleDateString("fr-FR", {
                                        day: "numeric",
                                        month: "long",
                                        year: "numeric",
                                        hour: "2-digit",
                                        minute: "2-digit",
                                    })}
                                </p>
                            </div>
                            {isAuthor && !isEditing && (
                                <div className="flex gap-2">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        onClick={() => startEditing(comment)}
                                        label=""
                                        icon={
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                            </svg>
                                        }
                                    />
                                    <Button
                                        variant="danger"
                                        size="sm"
                                        onClick={() => handleShowDeleteConfirm(comment.id)}
                                        label=""
                                        icon={
                                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                            </svg>
                                        }
                                    />
                                </div>
                            )}
                        </div>

                        {isEditing ? (
                            <div className="space-y-3">
                                <Textarea
                                    label=""
                                    value={editContent}
                                    onChange={(e) => setEditContent(e.target.value)}
                                    rows={3}
                                />
                                <div className="flex gap-2 justify-end">
                                    <Button
                                        variant="ghost"
                                        size="sm"
                                        label="Annuler"
                                        onClick={cancelEditing}
                                    />
                                    <Button
                                        variant="primary"
                                        size="sm"
                                        label="Sauvegarder"
                                        onClick={() => saveEdit(comment.id)}
                                    />
                                </div>
                            </div>
                        ) : (
                            <p className="text-gray-700 leading-relaxed">
                                {comment.content}
                            </p>
                        )}
                    </div>
                );
            })}

            {deleteConfirmId && (
                <ConfirmModal
                    message="Êtes-vous sûr de vouloir supprimer ce commentaire ? Cette action est irréversible."
                    onConfirm={handleConfirmDelete}
                    onCancel={handleCancelDelete}
                />
            )}
        </div>
    );
}
