import { Product } from "@/@types";

export interface ProductFormProps {
  type: "create" | "edit";
  product?: Product;
  productId?: string;
}
