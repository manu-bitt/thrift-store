import React, { useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";
import { useProducts } from "../context/ProductContext";

const ProductDetails = () => {
  const { id: productId } = useParams();
  const navigate = useNavigate();
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const { products, loading } = useProducts();
  const [imageError, setImageError] = useState(false);

  // Find product by _id
  const product = products.find(
    (p) => p._id === productId || String(p._id) === productId
  );

  if (loading) {
    return (
      <div style={styles.loading}>
        <p>Loading product...</p>
      </div>
    );
  }

  if (!product) {
    return (
      <div style={styles.notFound}>
        <h2>Product not found</h2>
        <p>The product you're looking for doesn't exist.</p>
        <button onClick={() => navigate("/shop")} style={styles.button}>
          Back to Shop
        </button>
      </div>
    );
  }

  const productIdForWishlist = product._id || product.id;
  const inWishlist = isInWishlist(productIdForWishlist);

  const handleAddToCart = () => {
    addToCart(product);
  };

  const handleWishlist = () => {
    if (inWishlist) {
      removeFromWishlist(productIdForWishlist);
    } else {
      addToWishlist(product);
    }
  };

  const defaultImage = "https://via.placeholder.com/600x600?text=No+Image";

  return (
    <div style={styles.container}>
      <button onClick={() => navigate(-1)} style={styles.backButton}>
        ← Back
      </button>

      <div style={styles.content}>
        <div style={styles.imageSection}>
          <div style={styles.imageContainer}>
            <img
              src={imageError ? defaultImage : product.image || defaultImage}
              alt={product.name}
              onError={() => setImageError(true)}
              style={styles.mainImage}
                  />
          </div>
        </div>

        <div style={styles.infoSection}>
          <h1 style={styles.title}>{product.name}</h1>
          
          {product.category && (
            <span style={styles.category}>{product.category}</span>
          )}

          <div style={styles.priceSection}>
            <p style={styles.price}>₹{product.price?.toLocaleString()}</p>
          </div>

          {product.description && (
            <div style={styles.descriptionSection}>
              <h3 style={styles.sectionTitle}>Description</h3>
              <p style={styles.description}>{product.description}</p>
            </div>
          )}

          <div style={styles.actions}>
            <button onClick={handleAddToCart} style={styles.addToCartButton}>
              Add to Cart
            </button>
            <button 
              onClick={handleWishlist} 
              style={{
                ...styles.wishlistButton,
                background: inWishlist ? "#f0f0f0" : "transparent",
              }}
            >
              {inWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            </button>
          </div>

          <div style={styles.features}>
            <div style={styles.feature}>
              <strong style={{ color: "#2d3748", fontSize: "0.95rem" }}>Free Shipping</strong>
              <span style={{ color: "#718096", fontSize: "0.875rem" }}>On orders over ₹500</span>
            </div>
            <div style={styles.feature}>
              <strong style={{ color: "#2d3748", fontSize: "0.95rem" }}>Easy Returns</strong>
              <span style={{ color: "#718096", fontSize: "0.875rem" }}>30-day return policy</span>
            </div>
            <div style={styles.feature}>
              <strong style={{ color: "#2d3748", fontSize: "0.95rem" }}>Secure Payment</strong>
              <span style={{ color: "#718096", fontSize: "0.875rem" }}>100% secure checkout</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "3rem 2rem",
  },
  loading: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "60vh",
    fontSize: "1.2rem",
    color: "#718096",
  },
  notFound: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  backButton: {
    background: "transparent",
    border: "2px solid #e2e8f0",
    padding: "0.75rem 1.5rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "500",
    color: "#4a5568",
    marginBottom: "2rem",
    transition: "all 0.2s",
  },
  content: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "4rem",
    background: "white",
    borderRadius: "12px",
    padding: "3rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  imageSection: {
    width: "100%",
  },
  imageContainer: {
    width: "100%",
    aspectRatio: "1",
    borderRadius: "12px",
    overflow: "hidden",
    background: "#f7fafc",
    position: "sticky",
    top: "100px",
  },
  mainImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  infoSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#2d3748",
    margin: 0,
  },
  category: {
    display: "inline-block",
    padding: "0.5rem 1rem",
    background: "#edf2f7",
    color: "#4a5568",
    borderRadius: "12px",
    fontSize: "0.875rem",
    fontWeight: "600",
  },
  priceSection: {
    padding: "1.5rem 0",
    borderTop: "1px solid #e2e8f0",
    borderBottom: "1px solid #e2e8f0",
  },
  price: {
    fontSize: "2.5rem",
    fontWeight: "700",
    color: "#000000",
    margin: 0,
  },
  descriptionSection: {
    marginTop: "1rem",
  },
  sectionTitle: {
    fontSize: "1.25rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "0.75rem",
  },
  description: {
    fontSize: "1rem",
    color: "#4a5568",
    lineHeight: "1.6",
  },
  actions: {
    display: "flex",
    gap: "1rem",
    marginTop: "1rem",
  },
  addToCartButton: {
    flex: 1,
    padding: "1rem 2rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  wishlistButton: {
    padding: "1rem 2rem",
    background: "transparent",
    color: "#000000",
    border: "2px solid #000000",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  features: {
    display: "flex",
    flexDirection: "column",
    gap: "1rem",
    marginTop: "2rem",
    padding: "1.5rem",
    background: "#f7fafc",
    borderRadius: "8px",
  },
  feature: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  button: {
    padding: "0.875rem 2rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    marginTop: "1rem",
  },
};

export default ProductDetails; 
