import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useWishlist } from "../context/WishlistContext";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { wishlist, addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [imageError, setImageError] = useState(false);

  const productId = product._id || product.id;
  const inWishlist = isInWishlist(productId);

  const handleWishlist = (e) => {
    e.preventDefault();
    e.stopPropagation();
    if (inWishlist) {
      removeFromWishlist(productId);
    } else {
      addToWishlist(product);
    }
  };

  const handleAddToCart = (e) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart(product);
  };

  const defaultImage = "https://via.placeholder.com/300x200?text=No+Image";

  return (
    <div className="product-card">
      <Link to={`/product/${productId}`} style={{ textDecoration: "none", color: "inherit" }}>
        <div style={styles.imageContainer}>
          <img
            src={imageError ? defaultImage : product.image || defaultImage}
            alt={product.name}
            onError={() => setImageError(true)}
            style={styles.image}
          />
          {inWishlist && (
            <div style={styles.wishlistBadge}>♥</div>
          )}
        </div>
        <h3 style={styles.title}>{product.name}</h3>
        <p style={styles.price}>₹{product.price?.toLocaleString()}</p>
        {product.category && (
          <span style={styles.category}>{product.category}</span>
        )}
      </Link>
      <div className="buttons">
        <button onClick={handleAddToCart} style={styles.cartButton}>
          Add to Cart
        </button>
        <button 
          onClick={handleWishlist} 
          style={{
            ...styles.wishlistButton,
            background: inWishlist ? "#000000" : "#f0f0f0",
            color: inWishlist ? "#ffffff" : "#000000",
          }}
        >
          {inWishlist ? "♥" : "♡"}
        </button>
      </div>
    </div>
  );
};

const styles = {
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "200px",
    overflow: "hidden",
    borderRadius: "8px",
    marginBottom: "1rem",
    background: "#f7fafc",
  },
  image: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
    transition: "transform 0.3s ease",
  },
  wishlistBadge: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    fontSize: "1.5rem",
    background: "rgba(255,255,255,0.9)",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  title: {
    margin: "0.5rem 0",
    fontSize: "1.1rem",
    color: "#2d3748",
    fontWeight: "600",
    minHeight: "2.5rem",
    display: "-webkit-box",
    WebkitLineClamp: 2,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  },
  price: {
    margin: "0.5rem 0",
    fontSize: "1.5rem",
    color: "#000000",
    fontWeight: "700",
  },
  category: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    background: "#edf2f7",
    color: "#4a5568",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "500",
    marginTop: "0.5rem",
  },
  cartButton: {
    flex: 1,
    padding: "0.6rem 1rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s",
    fontSize: "0.875rem",
  },
  wishlistButton: {
    padding: "0.6rem 1rem",
    background: "#edf2f7",
    color: "#4a5568",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1.2rem",
    transition: "all 0.2s",
    minWidth: "50px",
  },
};

export default ProductCard;
