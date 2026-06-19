import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Merges Tailwind CSS classes with conflict resolution.
 * Uses clsx for conditionals + tailwind-merge to deduplicate conflicting utilities.
 *
 * @example
 * cn("px-4 py-2 bg-red-500", isActive && "bg-blue-500") // → "px-4 py-2 bg-blue-500"
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}
