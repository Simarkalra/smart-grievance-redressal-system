import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
    organizationId: ""
  });

  const handleLogin = async () => {
    if (!data.username || !data.password || !data.organizationId) {
      alert("Please fill all fields");
      return;
    }

    try {
      const res = await API.post("/user/login", data);
      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "STAFF") {
        navigate("/assignee-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);
      alert("❌ Invalid credentials or organization ID");
    }
  };

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <h2 style={styles.title}>Login</h2>

        <p style={styles.subtitle}>
          Access your organization dashboard
        </p>

        {/* ✅ NEW: Instruction Box */}
        <div style={styles.helperBox}>
          <p>
            Login using the credentials provided during registration.
            <br />
            <strong>Admin</strong> → Manage system, assign staff  
            <br />
            <strong>Staff</strong> → Handle assigned grievances  
            <br />
            <strong>User</strong> → Submit and track complaints
          </p>
        </div>

        <input
          style={styles.input}
          placeholder="Username"
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder="Password"
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        <input
          style={styles.input}
          placeholder="Organization ID"
          value={data.organizationId}
          onChange={(e) =>
            setData({ ...data, organizationId: e.target.value })
          }
        />

        {/* ✅ SMALL HINT */}
        <p style={styles.hintText}>
          ℹ️ Organization ID was provided during system creation or registration
        </p>

        <button style={styles.button} onClick={handleLogin}>
          Login
        </button>

        <button
          style={styles.secondaryBtn}
          onClick={() => navigate("/")}
        >
          Back to Home
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
    width: "370px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
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
    marginBottom: "15px"
  },

  /* ✅ NEW */
  helperBox: {
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    padding: "12px",
    borderRadius: "8px",
    fontSize: "13px",
    color: "#374151",
    marginBottom: "15px",
    lineHeight: "1.5",
    textAlign: "left"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "12px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    outline: "none"
  },

  /* ✅ NEW */
  hintText: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "12px",
    textAlign: "left"
  },

  button: {
    width: "100%",
    padding: "12px",
    background: "linear-gradient(to right, #2563eb, #3b82f6)",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "10px"
  },

  secondaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#e5e7eb",
    color: "#111827",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  }
};