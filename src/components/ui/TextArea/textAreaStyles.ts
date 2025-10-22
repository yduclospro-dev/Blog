import { TextAreaVariant } from './textAreaTypes';

export const variantStyles: Record<TextAreaVariant, string> = {
  default: 'border border-gray-300 rounded-md p-4 text-gray-900 shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500',
  auth: 'border border-gray-300 rounded-lg px-4 py-3 focus:ring-2 focus:ring-indigo-500 focus:border-transparent outline-none transition placeholder:text-gray-400'
};

export const baseStyles = 'w-full text-justify';
