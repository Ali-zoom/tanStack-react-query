// lib/types.ts
export type Role = 'ADMIN' | 'USER'; // use the exact values of your UserRole enum


export type CurrentUser = {
  id: string;
  name: string;
  email: string;
  role: Role;
  profileImage: string | null;
};