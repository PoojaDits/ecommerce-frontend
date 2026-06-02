import React from 'react';

export interface PrivateRouteProps {
  children: React.ReactNode;
  allowedRoles?: string[];
}

export interface RoleRouteProps {
  children: React.ReactNode;
}
