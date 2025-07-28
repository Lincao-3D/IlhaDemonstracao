export interface SectionData {
  id: number;
  label: string;
  bg?: string;
  color?: string;
  isVideo?: boolean;
}

// The sections array is now correctly ordered and re-indexed from 1 to 8.
export const sections: SectionData[] = [
  { id: 1, label: "Seção 1", bg: "/img/bg1.webp" },
  { id: 2, label: "Seção 2", color: "#005099" },
  { id: 3, label: "Seção 3", bg: "/img/bg8.webp", color: "#777" }, // Formerly id 8
  { id: 4, label: "Seção 4", bg: "/img/bg3.webp", color: "#333" }, // Formerly id 3
  { id: 5, label: "Seção 5", isVideo: true, color: "#0b2b2e" }, // Formerly id 4
  { id: 6, label: "Seção 6", bg: "/img/bg5.webp" }, // Formerly id 5
  { id: 7, label: "Seção 7", bg: "/img/bg6.webp", color: "#111" }, // Formerly id 6
  { id: 8, label: "Seção 8", bg: "/img/bg7.webp", color: "#777" }, // Formerly id 7
];
