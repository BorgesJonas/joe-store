import { ShippingAddress } from "@/@types";

export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Joe Store";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_DESCRIPTION || "Store created with Next JS";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT = Number(
  process.env.NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT || 4
);

export const PAYMENT_METHODS = process.env.PAYMENT_METHODS
  ? process.env.PAYMENT_METHODS.split(",")
  : ["PayPal", "Stripe", "CashOnDelivery"];

export const DEFAULT_PAYMENT_METHOD =
  process.env.DEFAULT_PAYMENT_METHOD || PAYMENT_METHODS[0];

export const signInDefaultValues = {
  email: "",
  password: "",
};

export const signUpDefaultValues = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export const shippingAddressDefaultValues: ShippingAddress = {
  fullName: "John Doe",
  streetAddress: "123 Main st",
  city: "Anytown",
  postalCode: "123456",
  country: "USA",
};

export const productDefaultValues = {
  name: "",
  slug: "",
  category: "",
  images: [],
  brand: "",
  descritpion: "",
  price: "0",
  stock: 0,
  rating: "0",
  numReviews: "0",
  isFeatured: false,
  banner: null,
};

export const PAGE_SIZE = 12;

export const USER_ROLES = ["admin", "user"];
