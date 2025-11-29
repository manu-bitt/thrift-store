import React, { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Checkout = () => {
  const { cart, total, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: user?.name || "",
    address: user?.address || "",
    phone: user?.phone || "",
    payment: "Cash on Delivery",
  });

  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleOrder = async (e) => {
    e.preventDefault();

    if (!form.name || !form.address || !form.phone) {
      setStatus("⚠️ Please fill all required fields");
      return;
    }

    setLoading(true);
    setStatus("Processing your order...");

    // Simulate order processing
    await new Promise(resolve => setTimeout(resolve, 2000));

    setStatus("✅ Order placed successfully! Redirecting...");
    clearCart();

    setTimeout(() => {
      navigate("/shop");
    }, 2000);
  };

  if (cart.length === 0) {
    return (
      <div style={styles.emptyContainer}>
        <div style={styles.emptyCard}>
          <h2 style={styles.emptyTitle}>Your cart is empty</h2>
          <p style={styles.emptyText}>Add items to your cart before checkout</p>
        </div>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Checkout</h1>

      <div style={styles.layout}>
        <div style={styles.formSection}>
          <div style={styles.sectionCard}>
            <h2 style={styles.sectionTitle}>Shipping Information</h2>
            <form onSubmit={handleOrder} style={styles.form}>
              <div style={styles.inputGroup}>
                <label style={styles.label}>Full Name *</label>
                <input
                  name="name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Phone Number *</label>
                <input
                  name="phone"
                  type="tel"
                  placeholder="+91 1234567890"
                  value={form.phone}
                  onChange={handleChange}
                  required
                  style={styles.input}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Delivery Address *</label>
                <textarea
                  name="address"
                  placeholder="Street address, City, State, PIN"
                  value={form.address}
                  onChange={handleChange}
                  required
                  rows={4}
                  style={styles.textarea}
                />
              </div>

              <div style={styles.inputGroup}>
                <label style={styles.label}>Payment Method</label>
                <select
                  name="payment"
                  value={form.payment}
                  onChange={handleChange}
                  style={styles.select}
                >
                  <option value="Cash on Delivery">Cash on Delivery</option>
                  <option value="Online Payment">Online Payment (UPI/Card)</option>
                </select>
              </div>

              {status && (
                <div style={{
                  ...styles.status,
                  background: status.includes("✅") ? "#c6f6d5" : status.includes("⚠️") ? "#feebc8" : "#bee3f8",
                  color: status.includes("✅") ? "#22543d" : status.includes("⚠️") ? "#744210" : "#2c5282",
                }}>
                  {status}
                </div>
              )}

              <button
                type="submit"
                disabled={loading}
                style={styles.submitButton}
              >
                {loading ? "Processing..." : "Place Order"}
              </button>
            </form>
          </div>
        </div>

        <div style={styles.summarySection}>
          <div style={styles.summaryCard}>
            <h2 style={styles.summaryTitle}>Order Summary</h2>
            
            <div style={styles.itemsList}>
              {cart.map((item) => (
                <div key={item._id} style={styles.orderItem}>
                  <div style={styles.orderItemInfo}>
                    <span style={styles.orderItemName}>{item.name}</span>
                    <span style={styles.orderItemQty}>x {item.qty}</span>
                  </div>
                  <span style={styles.orderItemPrice}>
                    ₹{((item.price || 0) * (item.qty || 1)).toLocaleString()}
                  </span>
                </div>
              ))}
            </div>

            <div style={styles.divider}></div>

            <div style={styles.summaryRow}>
              <span>Subtotal</span>
              <span>₹{total.toLocaleString()}</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Shipping</span>
              <span style={styles.free}>FREE</span>
            </div>
            <div style={styles.summaryRow}>
              <span>Tax</span>
              <span>₹0</span>
            </div>

            <div style={styles.divider}></div>

            <div style={styles.totalRow}>
              <span>Total</span>
              <span style={styles.grandTotal}>₹{total.toLocaleString()}</span>
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
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "2rem",
    color: "#2d3748",
  },
  layout: {
    display: "grid",
    gridTemplateColumns: "1fr 400px",
    gap: "2rem",
    alignItems: "start",
  },
  formSection: {
    flex: 1,
  },
  sectionCard: {
    background: "white",
    borderRadius: "12px",
    padding: "2rem",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  sectionTitle: {
    fontSize: "1.5rem",
    fontWeight: "700",
    marginBottom: "1.5rem",
    color: "#2d3748",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.5rem",
  },
  inputGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "0.5rem",
  },
  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#4a5568",
  },
  input: {
    padding: "0.875rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "1rem",
    transition: "all 0.2s",
    outline: "none",
  },
  textarea: {
    padding: "0.875rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "1rem",
    resize: "vertical",
    fontFamily: "inherit",
    outline: "none",
  },
  select: {
    padding: "0.875rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "1rem",
    background: "white",
    cursor: "pointer",
    outline: "none",
  },
  status: {
    padding: "1rem",
    borderRadius: "8px",
    textAlign: "center",
    fontWeight: "500",
  },
  submitButton: {
    padding: "1rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "0.5rem",
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
  itemsList: {
    marginBottom: "1rem",
  },
  orderItem: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "1rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #e2e8f0",
  },
  orderItemInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "0.25rem",
  },
  orderItemName: {
    fontWeight: "500",
    color: "#2d3748",
  },
  orderItemQty: {
    fontSize: "0.875rem",
    color: "#718096",
  },
  orderItemPrice: {
    fontWeight: "600",
    color: "#2d3748",
  },
  divider: {
    height: "1px",
    background: "#e2e8f0",
    margin: "1rem 0",
  },
  summaryRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "0.75rem",
    color: "#4a5568",
  },
  free: {
    color: "#48bb78",
    fontWeight: "600",
  },
  totalRow: {
    display: "flex",
    justifyContent: "space-between",
    fontSize: "1.25rem",
    fontWeight: "700",
    color: "#2d3748",
    marginTop: "1rem",
  },
  grandTotal: {
    color: "#000000",
    fontSize: "1.5rem",
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
    fontSize: "1.1rem",
  },
};

export default Checkout;
