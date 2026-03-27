import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function CreateSystem() {
  const navigate = useNavigate();

  const [orgName, setOrgName] = useState("");
  const [createdData, setCreatedData] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    try {
      setLoading(true);

      if (!orgName.trim()) {
        alert("Organization name required");
        return;
      }

      const res = await API.post("/user/create-organization", {
        name: orgName
      });

      const orgId = res.data.orgId;
      const adminUsername = res.data.adminUsername;
      const adminPassword = res.data.adminPassword;

      setCreatedData({
        orgId,
        adminUsername,
        adminPassword
      });

    } catch (err) {
      console.error(err);
      alert("Failed to create organization");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.title}>Create New System</h2>
        <p style={styles.subtitle}>
          Setup your organization and generate admin credentials
        </p>

        <input
          style={styles.input}
          placeholder="Enter Organization Name"
          value={orgName}
          onChange={(e) => setOrgName(e.target.value)}
          disabled={loading}
        />

        <div style={styles.buttonGroup}>
          <button
            style={styles.primaryBtn}
            onClick={handleCreate}
            disabled={loading}
          >
            {loading ? "Creating..." : "Create Organization"}
          </button>

          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/")}
          >
            Back
          </button>
        </div>

        {/* SUCCESS CARD */}
        {createdData && (
          <div style={styles.successCard}>
            <h3 style={{ marginBottom: 10 }}>✅ Organization Created</h3>

            <div style={styles.infoRow}>
              <span>Org ID:</span>
              <strong>{createdData.orgId}</strong>
            </div>

            <div style={styles.infoRow}>
              <span>Username:</span>
              <strong>{createdData.adminUsername}</strong>
            </div>

            <div style={styles.infoRow}>
              <span>Password:</span>
              <strong>{createdData.adminPassword}</strong>
            </div>

            <button
              style={styles.loginBtn}
              onClick={() => navigate("/login")}
            >
              Go to Login
            </button>
          </div>
        )}

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
    width: "400px",
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

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px",
    marginBottom: "20px",
    outline: "none"
  },

  buttonGroup: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
    marginBottom: "20px"
  },

  primaryBtn: {
    flex: 1,
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  },

  secondaryBtn: {
    flex: 1,
    padding: "12px",
    background: "#e5e7eb",
    color: "#111827",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  },

  successCard: {
    marginTop: "20px",
    padding: "20px",
    borderRadius: "10px",
    background: "#f0fdf4",
    border: "1px solid #bbf7d0",
    textAlign: "left"
  },

  infoRow: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "8px",
    fontSize: "14px"
  },

  loginBtn: {
    marginTop: "15px",
    width: "100%",
    padding: "10px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  }
};