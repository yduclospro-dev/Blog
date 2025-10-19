import { CardVariant, CardPadding } from './cardTypes';

export const variantStyles: Record<CardVariant, string> = {
  default: 'bg-white rounded-2xl shadow-md border border-gray-100',
  auth: 'bg-white rounded-2xl shadow-xl',
  article: 'bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg',
  feature: 'bg-white/60 backdrop-blur-xl border border-gray-200 rounded-2xl shadow-lg hover:bg-white/80 hover:border-gray-300',
  modal: 'bg-white rounded-2xl shadow-xl border border-gray-100',
  glass: 'bg-white/60 backdrop-blur-md border border-gray-200 rounded-2xl',
};

export const paddingStyles: Record<CardPadding, string> = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8',
};

export const baseStyles = 'transition-all duration-200';
