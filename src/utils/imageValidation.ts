// File size constants
export const MAX_FILE_SIZE_BYTES = 5 * 1024 * 1024; // 5MB
export const MAX_FILE_SIZE_MB = 5;

// Image validation
export const ALLOWED_IMAGE_TYPES = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];

/**
 * Validates if a URL is a safe data URL for images
 * @param url - The URL to validate
 * @returns boolean - true if the URL is safe to use
 */
export const isValidImageDataUrl = (url: string): boolean => {
    if (!url) return false;
    
    // Check if it's a data URL with image content
    const dataUrlRegex = /^data:image\/(jpeg|jpg|png|gif|webp);base64,/i;
    return dataUrlRegex.test(url);
};

/**
 * Validates if a file is a valid image file
 * @param file - The file to validate
 * @returns object with validation result and error message
 */
export const validateImageFile = (file: File): { isValid: boolean; error?: string } => {
    if (!ALLOWED_IMAGE_TYPES.includes(file.type)) {
        return {
            isValid: false,
            error: 'Veuillez sélectionner un fichier image valide (JPEG, PNG, GIF, WebP).'
        };
    }

    if (file.size > MAX_FILE_SIZE_BYTES) {
        return {
            isValid: false,
            error: `L'image doit faire moins de ${MAX_FILE_SIZE_MB}MB.`
        };
    }

    return { isValid: true };
};