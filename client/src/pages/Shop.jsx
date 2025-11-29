import React, { useState } from "react";
import ProductCard from "../components/ProductCard";
import { useProducts } from "../context/ProductContext";

const Shop = () => {
  const { products, loading } = useProducts();
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");

  const categories = ["All", ...new Set(products.map(p => p.category).filter(Boolean))];

  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         (product.description && product.description.toLowerCase().includes(searchTerm.toLowerCase()));
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  if (loading) {
    return (
      <div style={styles.loading}>
        <div style={styles.spinner}></div>
        <p>Loading products...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.header}>
        <h1 style={styles.title}>Shop</h1>
        <p style={styles.subtitle}>Browse our collection of pre-loved treasures</p>
      </div>

      <div style={styles.filters}>
        <div style={styles.searchBox}>
          <input
            type="text"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={styles.searchInput}
          />
          <span style={styles.searchIcon}>🔍</span>
        </div>

        <div style={styles.categoryFilter}>
          <label style={styles.filterLabel}>Category:</label>
          <select
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
            style={styles.select}
          >
            {categories.map(cat => (
              <option key={cat} value={cat}>{cat}</option>
            ))}
          </select>
        </div>
      </div>

      {filteredProducts.length > 0 ? (
        <>
          <p style={styles.resultCount}>
            Showing {filteredProducts.length} product{filteredProducts.length !== 1 ? 's' : ''}
          </p>
          <div style={styles.productsGrid}>
            {filteredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </>
      ) : (
        <div style={styles.emptyState}>
          <p style={styles.emptyText}>No products found</p>
          <p style={styles.emptySubtext}>
            {searchTerm || selectedCategory !== "All" 
              ? "Try adjusting your filters" 
              : "Be the first to add a product!"}
          </p>
        </div>
      )}
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
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#2d3748",
  },
  subtitle: {
    fontSize: "1.2rem",
    color: "#718096",
  },
  filters: {
    display: "flex",
    gap: "1rem",
    marginBottom: "2rem",
    flexWrap: "wrap",
    alignItems: "center",
  },
  searchBox: {
    position: "relative",
    flex: "1",
    minWidth: "250px",
  },
  searchInput: {
    width: "100%",
    padding: "0.875rem 3rem 0.875rem 1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    transition: "all 0.2s",
  },
  searchIcon: {
    position: "absolute",
    right: "1rem",
    top: "50%",
    transform: "translateY(-50%)",
    fontSize: "1.2rem",
  },
  categoryFilter: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  filterLabel: {
    fontWeight: "600",
    color: "#4a5568",
  },
  select: {
    padding: "0.875rem 1rem",
    border: "2px solid #e2e8f0",
    borderRadius: "12px",
    fontSize: "1rem",
    outline: "none",
    cursor: "pointer",
    background: "white",
  },
  resultCount: {
    color: "#718096",
    marginBottom: "1.5rem",
    fontSize: "0.95rem",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
  },
  loading: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "60vh",
    gap: "1rem",
  },
  spinner: {
    width: "50px",
    height: "50px",
    border: "4px solid #e2e8f0",
    borderTop: "4px solid #667eea",
    borderRadius: "50%",
    animation: "spin 1s linear infinite",
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
  emptyText: {
    fontSize: "1.5rem",
    fontWeight: "600",
    color: "#2d3748",
    marginBottom: "0.5rem",
  },
  emptySubtext: {
    color: "#718096",
  },
};

// Add spinner animation
const styleSheet = document.createElement("style");
styleSheet.textContent = `
  @keyframes spin {
    0% { transform: rotate(0deg); }
    100% { transform: rotate(360deg); }
  }
`;
document.head.appendChild(styleSheet);

export default Shop;
