export interface ImageUploadProps {
    value?: string;
    onChange: (imageUrl: string | null) => void;
    placeholder?: string;
    className?: string;
}