export const APP_NAME = process.env.NEXT_PUBLIC_APP_NAME || "Joe Store";

export const APP_DESCRIPTION =
  process.env.NEXT_PUBLIC_DESCRIPTION || "Store created with Next JS";

export const SERVER_URL =
  process.env.NEXT_PUBLIC_SERVER_URL || "http://localhost:3000";

export const LATEST_PRODUCTS_LIMIT = Number(
  process.env.NEXT_PUBLIC_LATEST_PRODUCTS_LIMIT || 4
);

export const signInDefaultValues = {
  email: "",
  password: "",
};
