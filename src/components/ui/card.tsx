// src/components/ui/card.tsx
import React from 'react';
import { cn } from '@/lib/utils';

// ── Card ─────────────────────────────────────────────────────
export const Card = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('rounded-lg border bg-white shadow-sm', className)}
    {...props}
  >
    {children}
  </div>
));
Card.displayName = 'Card';

// ── CardContent ───────────────────────────────────────────────
export const CardContent = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-4', className)} {...props}>
    {children}
  </div>
));
CardContent.displayName = 'CardContent';

// ── CardFooter ────────────────────────────────────────────────
export const CardFooter = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div
    ref={ref}
    className={cn('flex items-center p-4 border-t', className)}
    {...props}
  >
    {children}
  </div>
));
CardFooter.displayName = 'CardFooter';

// ── CardHeader ────────────────────────────────────────────────
export const CardHeader = React.forwardRef<
  HTMLDivElement,
  React.HTMLAttributes<HTMLDivElement>
>(({ className, children, ...props }, ref) => (
  <div ref={ref} className={cn('p-4 pb-0', className)} {...props}>
    {children}
  </div>
));
CardHeader.displayName = 'CardHeader';

// ── CardTitle ─────────────────────────────────────────────────
export const CardTitle = React.forwardRef<
  HTMLHeadingElement,
  React.HTMLAttributes<HTMLHeadingElement>
>(({ className, children, ...props }, ref) => (
  <h3
    ref={ref}
    className={cn('text-lg font-semibold leading-tight', className)}
    {...props}
  >
    {children}
  </h3>
));
CardTitle.displayName = 'CardTitle';
