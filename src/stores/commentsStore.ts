"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Comment } from "@/types/Comment";

interface CommentsStore {
    comments: Comment[];
    getCommentsByArticle: (articleId: string) => Comment[];
    addComment: (newComment: Omit<Comment, "id" | "date">) => void;
    updateComment: (id: string, content: string) => void;
    deleteComment: (id: string) => void;
}

export const useCommentsStore = create<CommentsStore>()(
    persist(
        (set, get) => ({
            comments: [],
            
            getCommentsByArticle: (articleId) => 
                get().comments.filter((c) => c.articleId === articleId),
            
            addComment: (newComment) => {
                const comment: Comment = {
                    ...newComment,
                    id: crypto.randomUUID(),
                    date: new Date().toISOString(),
                };
                set({ comments: [...get().comments, comment] });
            },
            
            updateComment: (id, content) =>
                set({
                    comments: get().comments.map((c) =>
                        c.id === id ? { ...c, content } : c
                    ),
                }),
            
            deleteComment: (id) =>
                set({ 
                    comments: get().comments.filter((c) => c.id !== id) 
                }),
        }),
        { name: "comments-storage" }
    )
);
