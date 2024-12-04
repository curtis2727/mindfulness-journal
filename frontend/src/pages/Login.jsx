import { useState } from "react";
import axios from "axios";

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "http://localhost:5004";

const Login = () => {
  const [formData, setFormData] = useState({ usernameOrEmail: "", password: "" });
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

    if (!formData.usernameOrEmail || !formData.password) {
      setErrorMessage("Both username/email and password are required.");
      setLoading(false);
      return;
    }

    try {
      const response = await axios.post(`${API_BASE_URL}/auth/login`, formData, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });

      if (response.status === 200) {
        setSuccessMessage("Login successful! Redirecting...");
        setFormData({ usernameOrEmail: "", password: "" });

        localStorage.setItem("authToken", response.data.token);

        setTimeout(() => {
          window.location.href = "/";
        }, 2000);
      } else {
        throw new Error("Unexpected response status: " + response.status);
      }
    } catch (err) {
      console.error("Login failed:", err);

      const error =
        err.response?.data?.message ||
        (err.response?.status === 401
          ? "Unauthorized. Please check your credentials."
          : "An error occurred. Please try again later.");

      setErrorMessage(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.header}>Welcome Back</h1>
      <p style={styles.subHeader}>Log in to access your account</p>

      {successMessage && (
        <p
          style={{ ...styles.message, color: "#27ae60" }}
          aria-live="polite"
        >
          {successMessage}
        </p>
      )}
      {errorMessage && (
        <p
          style={{ ...styles.message, color: "#e74c3c" }}
          aria-live="assertive"
        >
          {errorMessage}
        </p>
      )}

      <form onSubmit={handleSubmit} style={styles.form}>
        <div style={styles.formGroup}>
          <label htmlFor="usernameOrEmail" style={styles.label}>
            Username or Email
          </label>
          <input
            type="text"
            id="usernameOrEmail"
            name="usernameOrEmail"
            placeholder="Enter your username or email"
            value={formData.usernameOrEmail}
            onChange={handleChange}
            style={styles.input}
            autoComplete="username"
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
            autoComplete="current-password"
            required
          />
        </div>

        <button
          type="submit"
          style={styles.button}
          disabled={loading}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#357ab7")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#4a90e2")}
        >
          {loading ? "Logging in..." : "Login"}
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
    transition: "border-color 0.3s ease",
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

export default Login;