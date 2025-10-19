import { useRef, useEffect } from "react";
import { Button, Input, Textarea, Card } from "@/components/ui";

interface EditArticleFormData {
  title: string;
  content: string;
}

interface EditArticlePresenterProps {
  formData: EditArticleFormData;
  onInputChange: (field: string, value: string) => void;
  onSave: () => void;
  onCancel: () => void;
}

export default function EditArticlePresenter({
  formData,
  onInputChange,
  onSave,
  onCancel,
}: EditArticlePresenterProps) {
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (textarea) {
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";

      const maxHeight = 384;
      textarea.style.overflow = textarea.scrollHeight > maxHeight ? "auto" : "hidden";
    }
  }, [formData.content]);

  return (
    <div className="bg-gradient-to-b from-gray-50 to-white min-h-screen py-16 px-6 md:px-20 lg:px-32">
      <Card variant="default" padding="lg" className="max-w-3xl mx-auto">
        <h1 className="text-4xl font-extrabold text-gray-900 mb-8">📝 Modifier l&apos;article</h1>

        <div className="space-y-6">
          <Input
            type="text"
            placeholder="Titre"
            value={formData.title}
            onChange={(e) => onInputChange('title', e.target.value)}
            variant="default"
          />

          <Textarea
            ref={textareaRef}
            placeholder="Contenu de l'article..."
            value={formData.content}
            onChange={(e) => onInputChange('content', e.target.value)}
            variant="default"
            rows={1}
            autoResize={true}
          />
        </div>

        <div className="flex justify-end gap-4 mt-10">
          <Button
            variant="outline"
            onClick={onCancel}
            label="Annuler"
          />

          <Button
            variant="primary"
            onClick={onSave}
            label="Enregistrer"
          />
        </div>
      </Card>
    </div>
  );
}
