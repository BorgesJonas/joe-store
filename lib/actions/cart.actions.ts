"use server";

import { CartItem } from "@/@types";

export async function addItemToCart(data: CartItem) {
  return { success: false, message: "There was one issue" };
}
