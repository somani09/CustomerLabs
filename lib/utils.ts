import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(...inputs));
}

// Shadow Depth Tokens

export const shadowDepthSoft =
  "shadow-[0_1px_3px_rgba(1,42,74,0.08),_0_2px_6px_rgba(1,42,74,0.1)]";

export const shadowDepthMedium =
  "shadow-[0_2px_8px_rgba(1,42,74,0.12),_0_4px_12px_rgba(1,42,74,0.15)]";

export const shadowDepthPrimary =
  "shadow-[0_2px_6px_rgba(1,42,74,0.15),_0_6px_12px_rgba(1,42,74,0.2),_0_12px_24px_rgba(1,42,74,0.25)] backdrop-blur-md";
