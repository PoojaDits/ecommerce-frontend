import React from 'react';

export interface SocialLink {
  icon: React.ReactNode;
  href: string;
}

export interface FooterLink {
  label: string;
  to: string;
}
