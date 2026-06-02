import React from 'react';
import { cn } from '@/lib/utils';

/**
 * Simple button that mimics shadcn's styling.
 * Accepts all standard button props.
 */
export const Button = React.forwardRef<
  HTMLButtonElement,
  React.ButtonHTMLAttributes<HTMLButtonElement>
>(({ className, children, ...props }, ref) => {
  return (
    <button
      ref={ref}
      className={cn(
        'inline-flex items-center justify-center rounded-full px-6 py-2.5 text-sm font-medium transition-colors focus-visible:outline-none disabled:opacity-50 disabled:pointer-events-none',
        // Default gradient – you can adjust to any brand colors
        'bg-gradient-to-r from-[#e94560] to-[#d63a52] text-white hover:opacity-90',
        className
      )}
      {...props}
    >
      {children}
    </button>
  );
});

Button.displayName = 'Button';
