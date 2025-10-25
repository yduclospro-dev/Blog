"use client";

import { useRef, useState } from "react";
import { ImageUploadProps } from "./imageUploadTypes";
import Button from "../Button/Button";

export default function ImageUpload({
    value,
    onChange,
    placeholder = "Choisir une image",
    className = "",
}: ImageUploadProps) {
    const fileInputRef = useRef<HTMLInputElement>(null);
    const [isUploading, setIsUploading] = useState(false);

    const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
        const file = event.target.files?.[0];
        if (!file) return;

        // Validate file type
        if (!file.type.startsWith('image/')) {
            alert('Veuillez sélectionner un fichier image valide.');
            return;
        }

        // Validate file size (max 5MB)
        if (file.size > 5 * 1024 * 1024) {
            alert('L\'image doit faire moins de 5MB.');
            return;
        }

        setIsUploading(true);

        try {
            // Convert to base64 for local storage
            const reader = new FileReader();
            reader.onload = (e) => {
                const base64String = e.target?.result as string;
                onChange(base64String);
                setIsUploading(false);
            };
            reader.onerror = () => {
                alert('Erreur lors du chargement de l\'image.');
                setIsUploading(false);
            };
            reader.readAsDataURL(file);
        } catch (error) {
            console.error('Error uploading image:', error);
            alert('Erreur lors du chargement de l\'image.');
            setIsUploading(false);
        }
    };

    const handleRemoveImage = () => {
        onChange(null);
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    };

    const handleButtonClick = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`space-y-4 ${className}`}>
            <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileSelect}
                className="hidden"
            />

            {value ? (
                <div className="relative group">
                    <img
                        src={value}
                        alt="Preview"
                        className="w-full h-48 object-cover rounded-lg border-2 border-gray-200 dark:border-slate-600"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-lg flex items-center justify-center">
                        <div className="flex gap-2">
                            <Button
                                variant="primary"
                                onClick={handleButtonClick}
                                disabled={isUploading}
                                label="Changer"
                                className="text-sm"
                            />
                            <Button
                                variant="danger"
                                onClick={handleRemoveImage}
                                label="Supprimer"
                                className="text-sm"
                            />
                        </div>
                    </div>
                </div>
            ) : (
                <div className="border-2 border-dashed border-gray-300 dark:border-slate-600 rounded-lg p-8 text-center hover:border-gray-400 dark:hover:border-slate-500 transition-colors">
                    <div className="flex flex-col items-center space-y-4">
                        <svg
                            className="w-12 h-12 text-gray-400 dark:text-slate-500"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2}
                                d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                            />
                        </svg>
                        <div>
                            <Button
                                variant="outline"
                                onClick={handleButtonClick}
                                disabled={isUploading}
                                label={isUploading ? "Chargement..." : placeholder}
                            />
                            <p className="text-sm text-gray-500 dark:text-slate-400 mt-2">
                                PNG, JPG, JPEG jusqu'à 5MB
                            </p>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}