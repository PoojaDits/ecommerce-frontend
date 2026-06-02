// src/components/ui/input.tsx
// Minimal shadcn/ui Input component – a styled <input> element.
import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Input – thin wrapper around the native <input> that applies Tailwind styles
 * and forwards a ref for easy focus handling.
 */
export const Input = React.forwardRef<
  HTMLInputElement,
  React.InputHTMLAttributes<HTMLInputElement>
>(({ className, type = 'text', ...props }, ref) => (
  <input
    ref={ref}
    type={type}
    className={cn(
      'flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      className
    )}
    {...props}
  />
))

Input.displayName = 'Input';
