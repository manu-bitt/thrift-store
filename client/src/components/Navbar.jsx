import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useCart } from "../context/CartContext";

const Navbar = () => {
  const { user, isAuthenticated, logout } = useAuth();
  const { cart } = useCart();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <nav style={styles.navbar}>
      <div style={styles.container}>
        <Link to="/" style={styles.logo}>
          <span style={styles.logoText}>ThriftStore</span>
        </Link>

        <ul style={styles.navLinks}>
          <li><Link to="/" style={styles.link}>Home</Link></li>
          <li><Link to="/shop" style={styles.link}>Shop</Link></li>
          <li><Link to="/sell" style={styles.link}>Sell</Link></li>
          <li>
            <Link to="/cart" style={styles.link}>
              Cart
              {cart.length > 0 && (
                <span style={styles.badge}>{cart.length}</span>
              )}
            </Link>
          </li>
          <li><Link to="/wishlist" style={styles.link}>Wishlist</Link></li>
        </ul>

        <div style={styles.authSection}>
          {isAuthenticated ? (
            <>
              <span style={styles.userName}>👤 {user?.name}</span>
              <button onClick={handleLogout} style={styles.logoutBtn}>
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" style={styles.authLink}>Login</Link>
              <Link to="/signup" style={styles.signupBtn}>Sign Up</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

const styles = {
  navbar: {
    background: "#000000",
    padding: "1rem 0",
    boxShadow: "0 2px 10px rgba(0,0,0,0.3)",
    position: "sticky",
    top: 0,
    zIndex: 1000,
  },
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "0 2rem",
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    flexWrap: "wrap",
    gap: "1rem",
  },
  logo: {
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
    textDecoration: "none",
    color: "white",
    fontSize: "1.5rem",
    fontWeight: "700",
  },
  logoText: {
    fontFamily: "system-ui, sans-serif",
  },
  navLinks: {
    display: "flex",
    listStyle: "none",
    gap: "2rem",
    margin: 0,
    padding: 0,
    flexWrap: "wrap",
  },
  link: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
    fontSize: "1rem",
    transition: "opacity 0.2s",
    position: "relative",
    display: "flex",
    alignItems: "center",
    gap: "0.5rem",
  },
  badge: {
    background: "#ffffff",
    color: "#000000",
    borderRadius: "50%",
    width: "20px",
    height: "20px",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
    fontWeight: "600",
  },
  authSection: {
    display: "flex",
    alignItems: "center",
    gap: "1rem",
  },
  userName: {
    color: "white",
    fontWeight: "500",
  },
  logoutBtn: {
    background: "rgba(255,255,255,0.2)",
    color: "white",
    border: "1px solid rgba(255,255,255,0.3)",
    padding: "0.5rem 1rem",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "500",
    transition: "all 0.2s",
  },
  authLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "500",
  },
  signupBtn: {
    background: "#ffffff",
    color: "#000000",
    padding: "0.5rem 1.5rem",
    borderRadius: "8px",
    textDecoration: "none",
    fontWeight: "600",
    transition: "transform 0.2s",
  },
};

export default Navbar;
