const API_URL = "http://localhost:5001/api/products";

export const getProducts = async () => {
  try {
    const res = await fetch(API_URL);
    if (!res.ok) throw new Error("Failed to fetch products");
    return await res.json();
  } catch (err) {
    console.error("Error fetching products:", err);
    return [];
  }
};

export const addProduct = async (product) => {
  try {
    const res = await fetch("http://localhost:5001/api/products", {
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
