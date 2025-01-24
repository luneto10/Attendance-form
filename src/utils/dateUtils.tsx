import { DateTime } from "luxon";

/**
 * Converts an ISO date from UTC to CST and returns only the date in YYYY-MM-DD format.
 * If the conversion fails, it returns an empty string.
 * @param isoDate - The date in ISO format (UTC).
 * @returns The date converted to CST in YYYY-MM-DD format or an empty string.
 */
export const convertToCST = (isoDate: string): string => {
    const cstDate = DateTime.fromISO(isoDate, { zone: "utc" }).setZone("America/Chicago");
    return cstDate.toISODate() || ""; // Fallback to empty string if null
};


/**
 * Sorts two students by date (descending) and, within the same date, alphabetically by name.
 * @param a - First student.
 * @param b - Second student.
 * @returns A number indicating the order (positive, negative, or zero).
 */
export const sortByDateAndName = (a: Student, b: Student): number => {
    const dateA = DateTime.fromISO(a.createdAt).toISODate() || "";
    const dateB = DateTime.fromISO(b.createdAt).toISODate() || "";

    // Sort by date in descending order (newest first)
    if (dateA !== dateB) {
        return dateB.localeCompare(dateA); // Newer date first
    }

    // Sort alphabetically by name if dates are the same
    return a.name.localeCompare(b.name);
};
