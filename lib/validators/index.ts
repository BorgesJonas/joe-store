import { z } from "zod";
import { formatNumberWithDecimal } from "../utils";

const currency = z
  .string()
  .refine(
    (value) => /^\d+(\.\d{2})?$/.test(formatNumberWithDecimal(Number(value))),
    "Price must have exactly two decimals"
  );

// Schema for inserting products
export const insertProductsSchema = z.object({
  name: z.string().min(3, "Name must be at least 3 characteres"),
  slug: z.string().min(3, "Slug must be at least 3 characteres"),
  category: z.string().min(3, "Category must be at least 3 characteres"),
  brand: z.string().min(3, "Brand must be at least 3 characteres"),
  description: z.coerce.number(),
  images: z.array(z.string()).min(1, "Product must have at least one image"),
  isFeatured: z.boolean(),
  banner: z.string().nullable(),
  price: currency,
});
