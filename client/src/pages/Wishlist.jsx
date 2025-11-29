import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useWishlist } from "../context/WishlistContext";
import { useCart } from "../context/CartContext";

const Wishlist = () => {
  const { wishlist, removeFromWishlist, clearWishlist } = useWishlist();
  const { addToCart } = useCart();
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (itemId) => {
    setImageErrors({ ...imageErrors, [itemId]: true });
  };

  if (wishlist.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyCard}>
          <h2 style={styles.emptyTitle}>Your wishlist is empty</h2>
          <p style={styles.emptyText}>Start adding items you love!</p>
          <Link to="/shop">
            <button style={styles.shopButton}>Browse Products</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>My Wishlist</h1>
        <p style={styles.subtitle}>{wishlist.length} item{wishlist.length !== 1 ? 's' : ''} saved</p>
      </div>

      <div style={styles.productsGrid}>
        {wishlist.map((item) => (
          <div key={item._id || item.id} style={styles.wishlistItem}>
            <Link to={`/product/${item._id || item.id}`} style={styles.itemLink}>
              <div style={styles.imageContainer}>
                <img
                  src={imageErrors[item._id || item.id]
                    ? "https://via.placeholder.com/300x200?text=No+Image"
                    : item.image || "https://via.placeholder.com/300x200?text=No+Image"}
                  alt={item.name}
                  onError={() => handleImageError(item._id || item.id)}
                  style={styles.itemImage}
                />
                <div style={styles.wishlistBadge}>💖</div>
              </div>
              <div style={styles.itemInfo}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>₹{item.price?.toLocaleString()}</p>
                {item.category && (
                  <span style={styles.itemCategory}>{item.category}</span>
                )}
              </div>
            </Link>
            
            <div style={styles.actions}>
              <button
                onClick={() => addToCart(item)}
                style={styles.addToCartButton}
              >
                Add to Cart
              </button>
              <button
                onClick={() => removeFromWishlist(item._id || item.id)}
                style={styles.removeButton}
              >
                Remove
              </button>
            </div>
          </div>
        ))}
      </div>

      <div style={styles.footer}>
        <button onClick={clearWishlist} style={styles.clearButton}>
          Clear Wishlist
        </button>
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
  header: {
    textAlign: "center",
    marginBottom: "3rem",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#718096",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  wishlistItem: {
    background: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
  },
  itemLink: {
    textDecoration: "none",
    color: "inherit",
    flex: 1,
  },
  imageContainer: {
    position: "relative",
    width: "100%",
    height: "200px",
    borderRadius: "8px",
    overflow: "hidden",
    marginBottom: "1rem",
    background: "#f7fafc",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  wishlistBadge: {
    position: "absolute",
    top: "0.5rem",
    right: "0.5rem",
    fontSize: "1.2rem",
    background: "rgba(0,0,0,0.8)",
    color: "white",
    borderRadius: "50%",
    width: "36px",
    height: "36px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
  },
  itemInfo: {
    marginBottom: "1rem",
  },
  itemName: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  itemPrice: {
    fontSize: "1.5rem",
    color: "#000000",
    fontWeight: "700",
    marginBottom: "0.5rem",
  },
  itemCategory: {
    display: "inline-block",
    padding: "0.25rem 0.75rem",
    background: "#edf2f7",
    color: "#4a5568",
    borderRadius: "12px",
    fontSize: "0.75rem",
    fontWeight: "500",
  },
  actions: {
    display: "flex",
    gap: "0.5rem",
    marginTop: "auto",
  },
  addToCartButton: {
    flex: 1,
    padding: "0.75rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.2s",
  },
  removeButton: {
    padding: "0.75rem 1rem",
    background: "#fed7d7",
    color: "#c53030",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "0.9rem",
    transition: "all 0.2s",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
  },
  clearButton: {
    padding: "0.875rem 2rem",
    background: "transparent",
    color: "#c53030",
    border: "2px solid #fed7d7",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    fontSize: "1rem",
    transition: "all 0.2s",
  },
  emptyContainer: {
    minHeight: "calc(100vh - 80px)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "2rem",
  },
  emptyCard: {
    textAlign: "center",
    background: "white",
    padding: "4rem",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
    maxWidth: "500px",
  },
  emptyIcon: {
    fontSize: "3rem",
    marginBottom: "1rem",
  },
  emptyTitle: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  emptyText: {
    color: "#718096",
    marginBottom: "2rem",
    fontSize: "1.1rem",
  },
  shopButton: {
    padding: "1rem 2.5rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "12px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
};

export default Wishlist;
