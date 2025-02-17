"use server";

import { PrismaClient } from "@prisma/client";
import { handleConvertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT } from "../consts";

// Get  latest products
export async function getLatestProducts() {
  const prisma = new PrismaClient();

  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return handleConvertToPlainObject(data);
}
