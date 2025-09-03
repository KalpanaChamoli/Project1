import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const token = process.env.API_TOKEN;