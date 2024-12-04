import React, { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5004";

const Register = () => {
  const [formData, setFormData] = useState({ username: "", email: "", password: "" });
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value.trim() }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");
    setLoading(true);

    const { username, email, password } = formData;

    if (!username || !email || !password) {
      setErrorMessage("All fields are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/register`, formData, {
        headers: { "Content-Type": "application/json" },
      });

      setSuccessMessage("Registration successful! Redirecting...");
      setFormData({ username: "", email: "", password: "" });

      setTimeout(() => {
        window.location.href = "/login";
      }, 2000);
    } catch (err) {
      console.error("Registration failed:", err);
      const error =
        err.response?.data?.message || "An error occurred during registration.";
      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Create Your Account</h1>
      <p style={styles.subHeader}>Join us and manage your account effortlessly</p>

      {successMessage && (
        <p style={{ ...styles.message, color: "#2ecc71" }}>{successMessage}</p>
      )}
      {errorMessage && (
        <p style={{ ...styles.message, color: "#e74c3c" }}>{errorMessage}</p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="username" style={styles.label}>
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            placeholder="Enter your username"
            value={formData.username}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="email" style={styles.label}>
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            placeholder="Enter your email"
            value={formData.email}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <div style={styles.formGroup}>
          <label htmlFor="password" style={styles.label}>
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            placeholder="Enter your password"
            value={formData.password}
            onChange={handleChange}
            style={styles.input}
            required
          />
        </div>

        <button
          type="submit"
          disabled={loading}
          style={styles.button}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#357ab7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
        >
          {loading ? "Registering..." : "Register"}
        </button>
      </form>
    </div>
  );
};

const styles = {
  container: {
    maxWidth: "600px",
    margin: "80px auto",
    padding: "40px",
    borderRadius: "12px",
    boxShadow: "0 10px 30px rgba(0, 0, 0, 0.15)",
    background: "linear-gradient(135deg, #ffffff, #f9f9f9)",
    fontFamily: "'Poppins', sans-serif",
    textAlign: "center",
    color: "#333",
  },
  header: {
    fontSize: "2.8rem",
    marginBottom: "15px",
    color: "#4a90e2",
    fontWeight: "700",
    letterSpacing: "1px",
  },
  subHeader: {
    fontSize: "1.2rem",
    marginBottom: "25px",
    color: "#666",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    gap: "20px",
  },
  formGroup: {
    width: "100%",
    display: "flex",
    flexDirection: "column",
    alignItems: "stretch",
  },
  label: {
    fontSize: "1rem",
    fontWeight: "600",
    color: "#555",
    marginBottom: "10px",
  },
  input: {
    padding: "14px 16px",
    fontSize: "1rem",
    borderRadius: "8px",
    border: "1px solid #ddd",
    background: "#f5f5f5",
    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
    outline: "none",
  },
  button: {
    width: "100%",
    maxWidth: "200px",
    padding: "12px 25px",
    fontSize: "1.2rem",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#4a90e2",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  message: {
    fontSize: "1rem",
    marginBottom: "20px",
  },
};

export default Register;