"use server";

import { prisma } from "@/db/prisma";

import { handleConvertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../consts";

// Get  latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return handleConvertToPlainObject(data);
}
