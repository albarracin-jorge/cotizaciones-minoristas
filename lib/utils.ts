import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(timestamp: string | Date) {
  const date = new Date(timestamp);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // ¡Los meses van de 0 a 11!
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

export function formatTime(timestamp: string | Date) {
    const time = timestamp.toString();
    const [hours, minutes] = time.split(':');
    const newTime = `${hours}:${minutes}`;
    return newTime;
}
