import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";

const Cart = () => {
  const {
    cart,
    addToCart,
    removeFromCart,
    removeProductCompletely,
    clearCart,
    total,
  } = useCart();
  const [imageErrors, setImageErrors] = useState({});

  const handleImageError = (itemId) => {
    setImageErrors({ ...imageErrors, [itemId]: true });
  };

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
      <div style={styles.emptyCard}>
        <h2 style={styles.emptyTitle}>Your cart is empty</h2>
        <p style={styles.emptyText}>Add some items to get started!</p>
          <Link to="/shop">
            <button style={styles.shopButton}>Browse Products</button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Shopping Cart</h1>
      
      <div style={styles.cartLayout}>
        <div style={styles.itemsSection}>
          {cart.map((item) => (
            <div key={item._id} style={styles.cartItem}>
              <div style={styles.imageContainer}>
                <img
                  src={imageErrors[item._id] 
                    ? "https://via.placeholder.com/200x200?text=No+Image"
                    : item.image || "https://via.placeholder.com/200x200?text=No+Image"}
                  alt={item.name}
                  onError={() => handleImageError(item._id)}
                  style={styles.itemImage}
                />
              </div>
              
              <div style={styles.itemDetails}>
                <h3 style={styles.itemName}>{item.name}</h3>
                <p style={styles.itemPrice}>₹{item.price?.toLocaleString()}</p>
                {item.category && (
                  <span style={styles.itemCategory}>{item.category}</span>
                )}
              </div>

              <div style={styles.quantityControls}>
                <button
                  onClick={() => removeFromCart(item._id)}
                  style={styles.quantityButton}
                >
                  −
                </button>
                <span style={styles.quantity}>{item.qty || 1}</span>
                <button
                  onClick={() => addToCart(item)}
                  style={styles.quantityButton}
                >
                  +
                </button>
              </div>

              <div style={styles.itemTotal}>
                <p style={styles.totalLabel}>Subtotal</p>
                <p style={styles.totalAmount}>
                  ₹{((item.price || 0) * (item.qty || 1)).toLocaleString()}
                </p>
              </div>

              <button
                onClick={() => removeProductCompletely(item._id)}
                style={styles.removeButton}
                title="Remove item"
              >
                🗑️
              </button>
            </div>
          ))}
        </div>

        <div style={styles.summarySection}>
          <div style={styles.summaryCard}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            <div style={styles.summaryRow}>
              <span>Items ({cart.length})</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span style={styles.free}>FREE</span>
            </div>
            <div style={styles.divider}></div>
            <div style={styles.summaryRowTotal}>
              <span>Total</span>
              <span style={styles.grandTotal}>₹{total.toLocaleString()}</span>
            </div>
            
            <Link to="/checkout" style={styles.checkoutLink}>
              <button style={styles.checkoutButton}>
                Proceed to Checkout
              </button>
            </Link>
            
            <button onClick={clearCart} style={styles.clearButton}>
              Clear Cart
            </button>
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
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#2d3748",
  },
  cartLayout: {
    display: "grid",
    gridTemplateColumns: "1fr 350px",
    gap: "2rem",
    alignItems: "start",
  },
  itemsSection: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  cartItem: {
    background: "white",
    borderRadius: "12px",
    padding: "1.5rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
    display: "grid",
    gridTemplateColumns: "120px 1fr auto auto auto",
    gap: "1.5rem",
    alignItems: "center",
  },
  imageContainer: {
    width: "120px",
    height: "120px",
    borderRadius: "8px",
    overflow: "hidden",
    background: "#f7fafc",
  },
  itemImage: {
    width: "100%",
    height: "100%",
    objectFit: "cover",
  },
  itemDetails: {
    flex: 1,
  },
  itemName: {
    fontSize: "1.2rem",
    fontWeight: "600",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  itemPrice: {
    fontSize: "1.1rem",
    color: "#667eea",
    fontWeight: "600",
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
  quantityControls: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
    background: "#f7fafc",
    padding: "0.5rem",
    borderRadius: "8px",
  },
  quantityButton: {
    width: "32px",
    height: "32px",
    border: "none",
    background: "white",
    borderRadius: "6px",
    cursor: "pointer",
    fontSize: "1.2rem",
    fontWeight: "600",
    color: "#667eea",
    boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
  },
  quantity: {
    minWidth: "30px",
    textAlign: "center",
    fontWeight: "600",
  },
  itemTotal: {
    textAlign: "right",
  },
  totalLabel: {
    fontSize: "0.875rem",
    color: "#718096",
    marginBottom: "0.25rem",
  },
  totalAmount: {
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#2d3748",
  },
  removeButton: {
    background: "transparent",
    border: "none",
    fontSize: "1.5rem",
    cursor: "pointer",
    padding: "0.5rem",
    borderRadius: "6px",
    transition: "background 0.2s",
  },
  summarySection: {
    position: "sticky",
    top: "100px",
  },
  summaryCard: {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  summaryTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    color: "#2d3748",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    color: "#4a5568",
  },
  free: {
    color: "#48bb78",
    fontWeight: "600",
  },
  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "1.5rem 0",
  },
  summaryRowTotal: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#2d3748",
    marginBottom: "1.5rem",
  },
  grandTotal: {
    color: "#000000",
    fontSize: "1.5rem",
  },
  checkoutLink: {
    display: "block",
    marginBottom: "1rem",
  },
  checkoutButton: {
    width: "100%",
    padding: "1rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
  },
  clearButton: {
    width: "100%",
    padding: "0.75rem",
    background: "transparent",
    color: "#c53030",
    border: "2px solid #fed7d7",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
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

export default Cart;
