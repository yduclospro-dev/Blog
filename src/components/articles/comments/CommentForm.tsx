"use client";

import { useState } from "react";
import { Button, TextArea, Toast } from "@/components/ui";
import type { ToastType } from "@/components/ui/Toast/toastTypes";

interface CommentFormProps {
    onSubmit: (content: string) => void;
}

export default function CommentForm({ onSubmit }: CommentFormProps) {
    const [content, setContent] = useState("");
    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const handleSubmit = () => {
        if (!content.trim()) {
            setToast({ message: "Le commentaire ne peut pas être vide !", type: "error" });
            return;
        }
        onSubmit(content);
        setContent(""); // Réinitialiser le formulaire
    };

    return (
        <>
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
            <div className="bg-white border-2 border-gray-200 rounded-xl p-6 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 mb-4">
                    💬 Ajouter un commentaire
                </h3>
                <TextArea
                    label="Votre commentaire"
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Partagez votre opinion..."
                    rows={4}
                />
                <div className="mt-4 flex justify-end">
                    <Button
                        variant="primary"
                        label="Publier"
                        onClick={handleSubmit}
                    />
                </div>
            </div>
        </>
    );
}
