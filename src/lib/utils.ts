import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}


export function toLabel(input: string): string {
  if(input.toLowerCase() === 'pc'){
    return "PC";
  }
  return input
  .split("_")
  .map(word => word.charAt(0).toUpperCase() + word.slice(1))
  .join(" ")
}


export const getCountryFlag = (country:string) => {
    const flags: Record<string, string> = {
      china: '🇨🇳',
      russia: '🇷🇺',
      india: '🇮🇳',
      germany: '🇩🇪',
      pakistan: '🇵🇰'
    };
    return flags[country] || '🏴';
  };
