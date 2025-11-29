import React from "react";
import { Link } from "react-router-dom";
import { useProducts } from "../context/ProductContext";
import ProductCard from "../components/ProductCard";

const Home = () => {
  const { products, loading } = useProducts();
  const featuredProducts = products.slice(0, 6);

  return (
    <div style={styles.container}>
      <div style={styles.hero}>
        <h1 style={styles.heroTitle}>Welcome to ThriftStore</h1>
        <p style={styles.heroSubtitle}>
          Discover unique, pre-loved treasures at unbeatable prices. 
          Shop sustainably and find your perfect style.
        </p>
        <div style={styles.heroButtons}>
          <Link to="/shop">
            <button style={styles.primaryButton}>Shop Now</button>
          </Link>
          <Link to="/sell">
            <button style={styles.secondaryButton}>Sell Your Items</button>
          </Link>
        </div>
      </div>

      {loading ? (
        <div style={styles.loading}>Loading products...</div>
      ) : featuredProducts.length > 0 ? (
        <div style={styles.section}>
          <h2 style={styles.sectionTitle}>Featured Products</h2>
          <div style={styles.productsGrid}>
            {featuredProducts.map((product) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
          <div style={styles.viewAll}>
            <Link to="/shop">
              <button style={styles.viewAllButton}>View All Products →</button>
            </Link>
          </div>
        </div>
      ) : (
        <div style={styles.emptyState}>
          <p>No products available yet. Be the first to sell!</p>
          <Link to="/sell">
            <button style={styles.primaryButton}>Start Selling</button>
          </Link>
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
  hero: {
    textAlign: "center",
    padding: "4rem 2rem",
    background: "#000000",
    borderRadius: "20px",
    color: "white",
    marginBottom: "4rem",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.3)",
  },
  heroTitle: {
    fontSize: "3rem",
    fontWeight: "700",
    marginBottom: "1rem",
    margin: 0,
  },
  heroSubtitle: {
    fontSize: "1.25rem",
    marginBottom: "2rem",
    opacity: 0.95,
    maxWidth: "600px",
    margin: "0 auto 2rem",
  },
  heroButtons: {
    display: "flex",
    gap: "1rem",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  primaryButton: {
    background: "#ffffff",
    color: "#000000",
    padding: "1rem 2.5rem",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(0,0,0,0.2)",
  },
  secondaryButton: {
    background: "transparent",
    color: "white",
    padding: "1rem 2.5rem",
    borderRadius: "12px",
    border: "2px solid white",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.3s",
  },
  section: {
    marginTop: "3rem",
  },
  sectionTitle: {
    fontSize: "2.5rem",
    fontWeight: "700",
    marginBottom: "2rem",
    textAlign: "center",
    color: "#2d3748",
  },
  productsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))",
    gap: "2rem",
    marginBottom: "3rem",
  },
  viewAll: {
    textAlign: "center",
    marginTop: "3rem",
  },
  viewAllButton: {
    background: "#000000",
    color: "#ffffff",
    padding: "1rem 2.5rem",
    borderRadius: "12px",
    border: "none",
    cursor: "pointer",
    fontSize: "1.1rem",
    fontWeight: "600",
    transition: "all 0.3s",
    boxShadow: "0 4px 15px rgba(0, 0, 0, 0.3)",
  },
  loading: {
    textAlign: "center",
    padding: "4rem",
    fontSize: "1.2rem",
    color: "#718096",
  },
  emptyState: {
    textAlign: "center",
    padding: "4rem",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
  },
};

export default Home;
