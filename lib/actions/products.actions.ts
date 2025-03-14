"use server";

import { prisma } from "@/db/prisma";

import { handleConvertToPlainObject } from "../utils";
import { LATEST_PRODUCTS_LIMIT, PAGE_SIZE } from "../consts";

// Get  latest products
export async function getLatestProducts() {
  const data = await prisma.product.findMany({
    take: LATEST_PRODUCTS_LIMIT,
    orderBy: { createdAt: "desc" },
  });

  return handleConvertToPlainObject(data);
}

// Get single product by slug
export async function getProductBySlug(slug: string) {
  return await prisma.product.findFirst({ where: { slug: slug } });
}

export async function getAllProducts({
  query,
  limit = PAGE_SIZE,
  page,
  category,
}: {
  query: string;
  limit?: number;
  page: number;
  category?: string;
}) {
  const data = await prisma.product.findMany({
    skip: (page - 1) * limit,
    take: limit,
  });

  const dataCount = await prisma.product.count();

  return {
    data,
    totalPages: Math.ceil(dataCount / limit),
  };
}
