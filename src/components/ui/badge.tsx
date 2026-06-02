// src/components/ui/badge.tsx
import React from 'react';
import { cn } from '@/lib/utils';

export const Badge = React.forwardRef<
  HTMLSpanElement,
  React.HTMLAttributes<HTMLSpanElement>
>(({ className, children, ...props }, ref) => (
  <span
    ref={ref}
    className={cn(
      'inline-flex items-center rounded-full bg-gray-100 px-2.5 py-0.5 text-xs font-medium text-gray-800',
      className
    )}
    {...props}
  >
    {children}
  </span>
));
Badge.displayName = 'Badge';
