import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function JoinSystem() {

  const [data, setData] = useState({
    username: "",
    password: "",
    role: "USER",
    orgId: ""
  });
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleRegister = async () => {
    setLoading(true);
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
      alert("Error registering. Username might be duplicate or org ID invalid.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div 
        style={styles.backButton} 
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Join Workspace</h2>

        <p style={styles.subtitle}>
          Register as a user or staff using your organization ID
        </p>

        {/* ✅ NEW: Instruction Box */}
        <div style={styles.helperBox}>
          <p>
            Enter your details to join an existing organization.
            <br />
            <strong>User</strong> → Submit and track grievances  
            <br />
            <strong>Staff</strong> → Manage and resolve assigned grievances  
          </p>
        </div>

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

        {/* ✅ SMALL HINT */}
        <p style={styles.hintText}>
          ℹ️ Organization ID is provided by your admin
        </p>

        <select
          style={styles.select}
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="STAFF">Staff</option>
        </select>

        {/* ✅ ROLE HINT */}
        <p style={styles.hintText}>
          Select your role carefully based on your access level
        </p>

        <button style={styles.button} onClick={handleRegister} disabled={loading}>
          {loading ? "Processing..." : "Register"}
        </button>
      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  backButton: {
    cursor: "pointer",
    color: "#4f46e5",
    fontWeight: "600",
    marginBottom: "20px",
    alignSelf: "flex-start",
    marginLeft: "max(calc(50vw - 200px), 20px)",
    fontSize: "15px",
    transition: "color 0.2s"
  },
  card: {
    width: "400px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    textAlign: "center"
  },
  title: {
    marginBottom: "8px",
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a"
  },
  subtitle: {
    fontSize: "15px",
    color: "#475569",
    marginBottom: "20px"
  },
  helperBox: {
    background: "rgba(241, 245, 249, 0.8)",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#334155",
    marginBottom: "20px",
    lineHeight: "1.6",
    textAlign: "left"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
    background: "#fff"
  },
  hintText: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "12px",
    textAlign: "left",
    lineHeight: "1.4"
  },
  select: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "12px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    background: "#fff",
    cursor: "pointer"
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
    transition: "transform 0.2s, box-shadow 0.2s"
  }
};