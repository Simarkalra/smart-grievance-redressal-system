import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const [data, setData] = useState({
    username: "",
    password: "",
    role: "USER"
  });

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user/register", data);
      alert("Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error registering");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Create Account</h2>
        <p style={styles.subtitle}>
          Register to access the grievance system
        </p>

        <form onSubmit={handleSubmit} style={styles.form}>
          <input
            style={styles.input}
            placeholder="Username"
            onChange={(e) =>
              setData({ ...data, username: e.target.value })
            }
          />

          <input
            style={styles.input}
            type="password"
            placeholder="Password"
            onChange={(e) =>
              setData({ ...data, password: e.target.value })
            }
          />

          <button style={styles.button} type="submit">
            Register
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #eef2f7, #f8fafc)",
    padding: "20px"
  },

  card: {
    width: "100%",
    maxWidth: "350px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    textAlign: "center"
  },

  title: {
    fontSize: "24px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#1f2937"
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px"
  },

  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px"
  },

  input: {
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none"
  },

  button: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s"
  }
};