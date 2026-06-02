// src/types/index.ts
// ============================================================
// Central barrel file — import ALL app types from here:
//   import type { Product, CartProduct, User, Category } from '@/types'
// ============================================================

// ── Product types ────────────────────────────────────────────
export type { Product, CartProduct, Category } from './product';

// ── Component prop interfaces ────────────────────────────────
export type { ProductCardProps, ProductGridProps } from './component';

// ── Layout types ─────────────────────────────────────────────
export type { LayoutProps } from './layout';

// ── Navigation / Footer types ────────────────────────────────
export type { SocialLink, FooterLink } from './navigation';

// ── Route guard types ─────────────────────────────────────────
export type { PrivateRouteProps, RoleRouteProps } from './routes';

// ── User / Auth types ─────────────────────────────────────────
// Defined inline here so any file can do:
//   import type { User } from '@/types'
export interface User {
  id: number | string;
  name: string;
  email: string;
  role: 'customer' | 'admin' | 'super-admin';
  avatar?: string;
}
