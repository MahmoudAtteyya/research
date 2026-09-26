/** Research team — author order as printed on the official poster. */

export type Student = {
  name: string;
  lead?: boolean;
  /** Designed and developed this website. */
  developer?: boolean;
};

export const STUDENTS: Student[] = [
  { name: "Rehab Shaban", lead: true },
  { name: "Mahmoud Attia", developer: true },
  { name: "Nagwa Adel" },
  { name: "Abd ElRahman Mahmoud" },
  { name: "Abd ElRahman Mostafa" },
  { name: "Ahmed Shaban" },
  { name: "Deng Ajou Luol" },
  { name: "Fatma Ali" },
  { name: "Fatma Saad" },
  { name: "Kyrollos Ashraf" },
  { name: "Laila Roshdy" },
  { name: "Mahmoud Eldoreay" },
  { name: "Mahmoud ElSayed" },
  { name: "Mohamed Abd Elhady" },
  { name: "Mohamed Elshahat" },
  { name: "Salah Mohamed" },
];

export type SupervisorRole = "project" | "year" | "general";

export type Supervisor = {
  name: string;
  role: SupervisorRole;
  photo: string;
};

export const SUPERVISORS: Supervisor[] = [
  { name: "Prof. Dr. Maysa Ibrahim", role: "project", photo: "/people/maysa-ibrahim.webp" },
  { name: "Dr. Mohamed Wagih Saleh", role: "project", photo: "/people/mohamed-wagih.webp" },
  { name: "Dr. Nanees Kamel Hussein", role: "year", photo: "/people/nanees-kamel.webp" },
  { name: "Dr. Yosra Saeed Abdalla", role: "general", photo: "/people/yosra-saeed.webp" },
];

export const DEVELOPER = STUDENTS.find((s) => s.developer)!.name;

export function initials(name: string): string {
  const parts = name.replace(/^(Prof\.|Dr\.)\s*/g, "").split(/\s+/).filter(Boolean);
  const first = parts[0]?.[0] ?? "";
  const last = parts.length > 1 ? parts[parts.length - 1][0] : "";
  return (first + last).toUpperCase();
}
