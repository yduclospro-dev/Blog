import React from 'react';

export type TextareaVariant = 'default' | 'auth';

export interface TextareaProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLTextAreaElement>) => void;
  placeholder?: string;
  label?: string;
  id?: string;
  name?: string;
  variant?: TextareaVariant;
  className?: string;
  disabled?: boolean;
  error?: string;
  rows?: number;
  autoResize?: boolean;
}
