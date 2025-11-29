import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./index.css";


import { CartProvider } from "./context/CartContext";
import { WishlistProvider } from "./context/WishlistContext"; 
import { ProductProvider } from "./context/ProductContext";
import { AuthProvider } from "./context/AuthContext";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <CartProvider>
        <WishlistProvider>
          <ProductProvider>
            <App />
          </ProductProvider>
        </WishlistProvider>
      </CartProvider>
    </AuthProvider>
  </React.StrictMode>
);
