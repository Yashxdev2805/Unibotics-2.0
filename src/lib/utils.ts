import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges class names safely without Tailwind conflict regressions.
 */
export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
