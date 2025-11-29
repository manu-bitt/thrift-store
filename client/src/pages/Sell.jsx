import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import { useAuth } from "../context/AuthContext";

const Sell = () => {
  const { createProduct } = useProducts();
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    name: "",
    price: "",
    description: "",
    category: "",
    image: "",
  });
  const [status, setStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const categories = [
    "Clothing",
    "Footwear",
    "Accessories",
    "Bags",
    "Electronics",
    "Collectibles",
    "Books",
    "Home & Living",
    "Other",
  ];

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!isAuthenticated) {
      setStatus("⚠️ Please login to sell items");
      setTimeout(() => navigate("/login"), 2000);
      return;
    }

    setLoading(true);
    setStatus("Adding product...");

    const newProduct = {
      name: form.name,
      price: parseFloat(form.price),
      description: form.description,
      category: form.category,
      image: form.image,
    };

    try {
      await createProduct(newProduct);
      setStatus("✅ Product added successfully!");
      setForm({
        name: "",
        price: "",
        description: "",
        category: "",
        image: "",
      });
      setTimeout(() => {
        navigate("/shop");
      }, 1500);
    } catch (error) {
      setStatus("❌ Error adding product. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h1 style={styles.title}>Sell Your Item</h1>
        <p style={styles.subtitle}>List your pre-loved items and find them a new home</p>

        {status && (
          <div style={{
            ...styles.status,
            background: status.includes("✅") ? "#c6f6d5" : status.includes("⚠️") ? "#feebc8" : "#fed7d7",
            color: status.includes("✅") ? "#22543d" : status.includes("⚠️") ? "#744210" : "#c53030",
          }}>
            {status}
          </div>
        )}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Product Name *</label>
            <input
              name="name"
              placeholder="e.g., Vintage Denim Jacket"
              value={form.name}
              onChange={handleChange}
              required
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Price (₹) *</label>
            <input
              name="price"
              type="number"
              placeholder="0.00"
              value={form.price}
              onChange={handleChange}
              required
              min="0"
              step="0.01"
              style={styles.input}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Category</label>
            <select
              name="category"
              value={form.category}
              onChange={handleChange}
              style={styles.select}
            >
              <option value="">Select a category</option>
              {categories.map(cat => (
                <option key={cat} value={cat}>{cat}</option>
              ))}
            </select>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Description</label>
            <textarea
              name="description"
              placeholder="Describe your item (condition, size, etc.)"
              value={form.description}
              onChange={handleChange}
              rows={4}
              style={styles.textarea}
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Image URL *</label>
            <input
              name="image"
              type="url"
              placeholder="https://example.com/image.jpg"
              value={form.image}
              onChange={handleChange}
              required
              style={styles.input}
            />
            <small style={styles.helpText}>
              Tip: Use Unsplash or Imgur for free image hosting
            </small>
          </div>

          {form.image && (
            <div style={styles.imagePreview}>
              <img src={form.image} alt="Preview" style={styles.previewImg} />
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Adding Product..." : "List Item for Sale"}
          </button>
        </form>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "calc(100vh - 80px)",
    maxWidth: "800px",
    margin: "0 auto",
    padding: "3rem 2rem",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "3rem",
    boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  subtitle: {
    color: "#718096",
    marginBottom: "2rem",
    fontSize: "1.1rem",
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
  select: {
    padding: "0.875rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "1rem",
    background: "white",
    cursor: "pointer",
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
  helpText: {
    color: "#718096",
    fontSize: "0.875rem",
  },
  imagePreview: {
    marginTop: "0.5rem",
    borderRadius: "8px",
    overflow: "hidden",
    border: "2px solid #e2e8f0",
  },
  previewImg: {
    width: "100%",
    maxHeight: "300px",
    objectFit: "cover",
  },
  button: {
    padding: "1rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1.1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "1rem",
  },
  status: {
    padding: "1rem",
    borderRadius: "8px",
    marginBottom: "1.5rem",
    textAlign: "center",
    fontWeight: "500",
  },
};

export default Sell;
