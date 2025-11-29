import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Signup = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    address: "",
  });
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { signup } = useAuth();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters");
      return;
    }

    setLoading(true);
    const result = await signup(
      formData.name,
      formData.email,
      formData.password,
      formData.phone,
      formData.address
    );

    if (result.success) {
      navigate("/");
    } else {
      setError(result.message);
    }
    setLoading(false);
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h2 style={styles.title}>Create Account</h2>
          <p style={styles.subtitle}>Join ThriftStore today</p>
        </div>

        {error && <div style={styles.error}>{error}</div>}

        <form onSubmit={handleSubmit} style={styles.form}>
          <div style={styles.inputGroup}>
            <label style={styles.label}>Full Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="Enter your full name"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={styles.input}
              placeholder="your.email@example.com"
            />
          </div>

          <div style={styles.passwordRow}>
            <div style={styles.inputGroup}>
              <label style={styles.label}>Password *</label>
              <input
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Min. 6 characters"
              />
            </div>

            <div style={styles.inputGroup}>
              <label style={styles.label}>Confirm Password *</label>
              <input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                required
                style={styles.input}
                placeholder="Re-enter password"
              />
            </div>
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Phone Number</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              style={styles.input}
              placeholder="+91 1234567890"
            />
          </div>

          <div style={styles.inputGroup}>
            <label style={styles.label}>Address</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleChange}
              style={styles.textarea}
              placeholder="Street address, City, State, PIN"
              rows={3}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={styles.button}
          >
            {loading ? "Creating Account..." : "Create Account"}
          </button>
        </form>

        <div style={styles.footer}>
          <p style={styles.footerText}>
            Already have an account?{" "}
            <Link to="/login" style={styles.link}>
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    background: "#000000",
    padding: "2rem 1rem",
  },
  card: {
    background: "white",
    borderRadius: "16px",
    padding: "3rem",
    width: "100%",
    maxWidth: "550px",
    boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
  },
  header: {
    textAlign: "center",
    marginBottom: "2rem",
  },
  title: {
    fontSize: "2rem",
    fontWeight: "700",
    marginBottom: "0.5rem",
    color: "#1a202c",
  },
  subtitle: {
    color: "#718096",
    fontSize: "0.95rem",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "1.25rem",
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
    fontFamily: "inherit",
  },
  textarea: {
    padding: "0.875rem",
    border: "2px solid #e2e8f0",
    borderRadius: "8px",
    fontSize: "1rem",
    resize: "vertical",
    fontFamily: "inherit",
    outline: "none",
    transition: "all 0.2s",
  },
  passwordRow: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "1rem",
  },
  button: {
    padding: "1rem",
    background: "#000000",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "1rem",
    fontWeight: "600",
    cursor: "pointer",
    transition: "all 0.2s",
    marginTop: "0.5rem",
  },
  error: {
    background: "#fed7d7",
    color: "#c53030",
    padding: "0.875rem",
    borderRadius: "8px",
    fontSize: "0.875rem",
    textAlign: "center",
    marginBottom: "1rem",
  },
  footer: {
    textAlign: "center",
    marginTop: "2rem",
    paddingTop: "1.5rem",
    borderTop: "1px solid #e2e8f0",
  },
  footerText: {
    color: "#718096",
    fontSize: "0.95rem",
  },
  link: {
    color: "#000000",
    textDecoration: "none",
    fontWeight: "600",
  },
};

export default Signup;
