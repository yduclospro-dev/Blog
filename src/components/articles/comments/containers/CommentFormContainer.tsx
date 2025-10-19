"use client";

import { useState } from "react";
import CommentFormPresenter from "../presenters/CommentFormPresenter";

interface CommentFormContainerProps {
    onSubmit: (content: string) => void;
}

export default function CommentFormContainer({ onSubmit }: CommentFormContainerProps) {
    const [content, setContent] = useState("");

    const handleInputChange = (value: string) => {
        setContent(value);
    };

    const handleSubmit = () => {
        if (!content.trim()) {
            alert("Le commentaire ne peut pas être vide !");
            return;
        }
        onSubmit(content);
        setContent(""); // Réinitialiser le formulaire
    };

    return (
        <CommentFormPresenter
            content={content}
            onInputChange={handleInputChange}
            onSubmit={handleSubmit}
        />
    );
}
