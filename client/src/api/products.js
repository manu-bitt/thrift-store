import { API_ENDPOINTS } from "../config/api";

export const getProducts = async () => {
  try {
    const res = await fetch(API_ENDPOINTS.PRODUCTS);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const addProduct = async (product) => {
  try {
    const res = await fetch(API_ENDPOINTS.PRODUCTS, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(product),
    });
    if (!res.ok) throw new Error("Failed to add product");
    return await res.json();
  } catch (err) {
    console.error("Error adding product:", err);
    return null;
  }
};
