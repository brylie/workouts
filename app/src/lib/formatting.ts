/**
 * Formatting utilities for consistent UI presentation
 */

/**
 * Format muscle group for display by:
 * 1. Replacing underscores with spaces
 * 2. Capitalizing the first letter of each word
 *
 * @param muscleGroup - The muscle group string to format (e.g., "upper_body")
 * @returns Formatted string (e.g., "Upper Body")
 */
export function formatMuscleGroup(muscleGroup: string): string {
  return muscleGroup
    .split("_")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
}
