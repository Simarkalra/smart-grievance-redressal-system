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
      <div 
        style={styles.backButton} 
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>Create Workspace</h2>

        <p style={styles.subtitle}>
          Setup your organization and generate admin credentials
        </p>

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

        <button
          style={styles.button}
          onClick={handleCreate}
          disabled={loading}
        >
          {loading ? "Creating..." : "Create Organization"}
        </button>

        {createdData && (
          <div style={styles.successCard}>
            <h3 style={{ marginBottom: 10 }}>✅ Organization Created</h3>

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
    width: "100%",
    maxWidth: "400px",
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