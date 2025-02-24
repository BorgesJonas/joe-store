import { CartItem } from "@/@types";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

const CURRENCY_FORMATTER = new Intl.NumberFormat("en-US", {
  currency: "USD",
  style: "currency",
  minimumFractionDigits: 2,
});

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

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export async function formatError(error: any) {
  if (error.name === "ZodError") {
    const fieldErrors = Object.keys(error.errors).map(
      (field) => error.errors[field].message
    );

    return fieldErrors.join(". ");
  } else if (
    error.name === "PrismaClientKnownRequestError" &&
    error.code === "P2002"
  ) {
    const field = error.meta.target ? error.meta.target[0] : "Field";
    return `${field.charAt(0).toUpperCase() + field.slice(1)} already exists`;
  } else {
    return typeof error.message === "string"
      ? error.message
      : JSON.stringify(error.message);
  }
}

export function formatPrice(price: number | string) {
  if (typeof price === "number") {
    return Math.round((price + Number.EPSILON) * 100) / 100;
  } else if (typeof price === "string") {
    return Math.round((Number(price) + Number.EPSILON) * 100) / 100;
  } else {
    throw new Error("Price must be number or string");
  }
}

export function calculateCartPrice(items: CartItem[]) {
  const reducedPrice = items.reduce(
    (value, item) => value + Number(item.price) * item.quantity,
    0
  );

  const itemsPrice = formatPrice(reducedPrice);
  const shippingPrice = formatPrice(itemsPrice > 100 ? 0 : 10);
  const taxPrice = formatPrice(itemsPrice * 0.15);
  const totalPrice = formatPrice(itemsPrice + shippingPrice + taxPrice);

  return {
    itemsPrice: itemsPrice.toFixed(2),
    shippingPrice: shippingPrice.toFixed(2),
    taxPrice: taxPrice.toFixed(2),
    totalPrice: totalPrice.toFixed(2),
  };
}

export function formatCurrency(amount: number | string | null) {
  if (typeof amount === "number") {
    return CURRENCY_FORMATTER.format(amount);
  }

  if (typeof amount === "string") {
    return CURRENCY_FORMATTER.format(Number(amount));
  }

  return "NaN";
}
