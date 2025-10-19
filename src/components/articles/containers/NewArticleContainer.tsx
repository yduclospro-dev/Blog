"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";
import { useArticleStore } from "@/stores/articlesStore";
import { useRequireAuth } from "@/lib/hooks/useRequireAuth";
import { useUserStore } from "@/stores/userStore";
import ForbiddenAccess from "@/components/ForbiddenAccess";
import NewArticlePresenter from "../presenters/NewArticlePresenter";

export default function NewArticleContainer() {
    const router = useRouter();
    const { addArticle } = useArticleStore();
    const { currentUser } = useUserStore();
    const isAuthenticated = useRequireAuth();

    const [formData, setFormData] = useState({
        title: "",
        date: new Date().toISOString().split("T")[0],
        content: "",
    });

    const handleInputChange = (field: string, value: string) => {
        setFormData(prev => ({ ...prev, [field]: value }));
    };

    const handleSave = () => {
        if (!formData.title || !formData.content) {
            alert("Le titre et le contenu sont requis !");
            return;
        }

        if (!currentUser) {
            alert("Erreur : utilisateur non connecté");
            return;
        }

        const newArticle = {
            id: Date.now(),
            ...formData,
            author: currentUser.username,
        };

        addArticle(newArticle);
        router.push("/articles");
    };

    const handleCancel = () => {
        router.push("/articles");
    };

    if (!isAuthenticated) {
        return (
            <ForbiddenAccess 
                message="Vous devez être connecté pour créer un nouvel article."
            />
        );
    }

    return (
        <NewArticlePresenter
            formData={formData}
            onInputChange={handleInputChange}
            onSave={handleSave}
            onCancel={handleCancel}
        />
    );
}
