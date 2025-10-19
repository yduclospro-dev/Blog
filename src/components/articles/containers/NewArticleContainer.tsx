"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useArticleStore } from "@/stores/articlesStore";
import { useUserStore } from "@/stores/userStore";
import ForbiddenAccess from "@/components/ForbiddenAccess";
import NewArticlePresenter from "../presenters/NewArticlePresenter";
import { Toast } from "@/components/ui";
import type { ToastType } from "@/components/ui/Toast/toastTypes";

export default function NewArticleContainer() {
    const router = useRouter();
    const { addArticle } = useArticleStore();
    const { currentUser } = useUserStore();

    const [formData, setFormData] = useState({
        title: "",
        content: "",
    });

    const [toast, setToast] = useState<{ message: string; type: ToastType } | null>(null);

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!formData.title.trim() || !formData.content.trim()) {
            setToast({ message: "Le titre et le contenu sont requis !", type: "error" });
            return;
        }

        if (!currentUser) {
            setToast({ message: "Erreur : utilisateur non connecté", type: "error" });
            return;
        }

        const newArticle = {
            title: formData.title,
            content: formData.content,
            author: currentUser.username,
            authorId: currentUser.id,
        };

        addArticle(newArticle);
        router.push("/articles");
    };

    const handleCancel = () => {
        router.push("/articles");
    };

    if (!currentUser) {
        return (
            <ForbiddenAccess 
                message="Vous devez être connecté pour créer un nouvel article."
            />
        );
    }

    return (
        <>
            {toast && (
                <Toast 
                    message={toast.message} 
                    type={toast.type} 
                    onClose={() => setToast(null)} 
                />
            )}
            <NewArticlePresenter
                formData={formData}
                onInputChange={handleInputChange}
                onSave={handleSave}
                onCancel={handleCancel}
            />
        </>
    );
}
