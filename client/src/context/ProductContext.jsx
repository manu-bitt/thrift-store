import React, { createContext, useContext, useEffect, useState } from "react";
import { getProducts, addProduct } from "../api/products";

const ProductContext = createContext();

export const useProducts = () => useContext(ProductContext);

export const ProductProvider = ({ children }) => {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);


  const fetchProducts = async () => {
    setLoading(true);
    const data = await getProducts();
    setProducts(data);
    setLoading(false);
  };

  const createProduct = async (newProduct) => {
    const added = await addProduct(newProduct);
    if (added) {
      setProducts((prev) => [...prev, added]); 
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  return (
    <ProductContext.Provider
      value={{ products, loading, fetchProducts, createProduct }}
    >
      {children}
    </ProductContext.Provider>
  );
};
