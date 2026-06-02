// src/lib/utils.ts
// Utility helper for merging Tailwind class names safely

/**
 * cn – concatenates class name strings, filtering out falsy values.
 * Drop-in replacement for clsx or classnames.
 * Usage: cn('base-class', condition && 'conditional-class', props.className)
 */
export function cn(...classes: (string | false | null | undefined)[]): string {
  return classes.filter(Boolean).join(' ');
}
