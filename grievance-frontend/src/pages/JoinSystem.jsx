import { useState } from "react";
import API from "../api/api";

export default function JoinSystem() {

  const [data, setData] = useState({
    username: "",
    password: "",
    role: "USER",
    orgId: ""
  });

  const handleRegister = async () => {
    try {
      await API.post(
        `/user/register-with-org?orgId=${data.orgId}`,
        {
          username: data.username,
          password: data.password,
          role: data.role
        }
      );

      alert("Registered Successfully");

    } catch {
      alert("Error registering");
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.title}>Join Existing System</h2>
        <p style={styles.subtitle}>
          Register as a user or staff using your organization ID
        </p>

        <input
          style={styles.input}
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <input
          style={styles.input}
          placeholder="Organization ID"
          onChange={(e) => setData({ ...data, orgId: e.target.value })}
        />

        <select
          style={styles.select}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="STAFF">Staff</option>
        </select>

        <button style={styles.button} onClick={handleRegister}>
          Register
        </button>
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
    width: "350px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    textAlign: "center"
  },

  title: {
    marginBottom: "8px",
    fontSize: "24px",
    fontWeight: "600",
    color: "#1f2937"
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none"
  },

  select: {
    width: "100%",
    padding: "10px",
    marginBottom: "20px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    background: "#fff"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    transition: "0.2s"
  }
};