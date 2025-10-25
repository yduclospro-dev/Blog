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
    const dataUrlRegex = /^data:image\/(jpeg|png|gif|webp);base64,/i;
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

/**
 * Checks if an error is a localStorage quota exceeded error
 * @param error - The error to check
 * @returns boolean - true if it's a quota error
 */
export const isQuotaExceededError = (error: unknown): boolean => {
    return error instanceof DOMException && (
        error.code === 22 ||
        error.code === 1014 ||
        error.name === 'QuotaExceededError' ||
        error.name === 'NS_ERROR_DOM_QUOTA_REACHED'
    );
};