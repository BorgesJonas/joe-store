"use server";

import { CartItem } from "@/@types";

export async function addItemToCart(data: CartItem) {
  console.log("DATA", data);
  return { success: false, message: "There was one issue" };
}
