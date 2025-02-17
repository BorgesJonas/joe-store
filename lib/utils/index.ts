import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function handleConvertToPlainObject<T>(object: T): T {
  return JSON.parse(JSON.stringify(object));
}

export function formatNumberWithDecimal(number: number): string {
  const [int, decimal] = number.toString().split(".");
  return decimal ? `${int}.${decimal.padEnd(2, "0")}` : `${int}.00`;
}
