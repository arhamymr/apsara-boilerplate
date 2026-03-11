export function formatUserDate(date: string | Date | unknown): string {
  if (!date) return "-";

  try {
    const d = typeof date === "string" ? new Date(date) : (date as Date);
    return isNaN(d.getTime()) ? "-" : d.toLocaleDateString();
  } catch {
    return "-";
  }
}

export function formatUserDateTime(date: string | Date | unknown): string {
  if (!date) return "-";

  try {
    const d = typeof date === "string" ? new Date(date) : (date as Date);
    return isNaN(d.getTime()) ? "-" : d.toLocaleString();
  } catch {
    return "-";
  }
}

export function normalizeUserRole(role: string): "user" | "admin" {
  const normalized = role.trim().toLowerCase();
  return normalized === "admin" ? "admin" : "user";
}
