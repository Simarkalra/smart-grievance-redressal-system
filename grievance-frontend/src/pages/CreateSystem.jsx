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

        {/* ✅ NEW: Instruction Box */}
        <div style={styles.helperBox}>
          <p>
            Enter your organization name to create a new system.
            <br />
            You will be assigned as the <strong>Admin</strong>.
          </p>
        </div>

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

        {/* ✅ SUCCESS CARD */}
        {createdData && (
          <div style={styles.successCard}>
            <h3 style={{ marginBottom: 10 }}>✅ Organization Created</h3>

            {/* 🔴 IMPORTANT NOTE */}
            <p style={styles.warningText}>
              ⚠️ Please save these credentials. They will not be shown again.
            </p>

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
    width: "420px",
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
    fontSize: "14px",
    color: "#374151",
    marginBottom: "20px",
    lineHeight: "1.5"
  },

  input: {
    width: "100%",
    padding: "12px",
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
    background: "linear-gradient(to right, #2563eb, #3b82f6)",
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

  /* ✅ NEW */
  warningText: {
    fontSize: "13px",
    color: "#b91c1c",
    marginBottom: "10px",
    fontWeight: "500"
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