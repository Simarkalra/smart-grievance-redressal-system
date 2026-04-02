import { useNavigate } from "react-router-dom";

export default function AdminPanel() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>

      <h2 style={styles.title}>Admin Dashboard</h2>

      <p style={styles.welcome}>
        Welcome, <b>{user?.username}</b>
      </p>

      {/* ✅ NEW: Instruction Box */}
      <div style={styles.helperBox}>
        <p>
          As an <strong>Admin</strong>, you can manage your organization:
          <br />
          • Create and manage <strong>categories</strong> for grievances  
          <br />
          • Assign <strong>staff (assignees)</strong> to categories  
          <br />
          • Define <strong>keywords</strong> with priority (High, Medium, Low)  
          <br />
          • Monitor and track all <strong>grievances</strong>  
          <br /><br />
          ⚠️ Each organization is independent and managed by one admin only.
        </p>
      </div>

      <div style={styles.grid}>

        {/* CREATE CATEGORY */}
        <div style={styles.card}>
          <h3>Manage Categories</h3>
          <p>Create grievance categories and define structure</p>
          <button style={styles.btn} onClick={() => navigate("/admin/categories")}>
            Go
          </button>
        </div>

        {/* ASSIGNEES */}
        <div style={styles.card}>
          <h3>Manage Assignees</h3>
          <p>Add staff and assign them to categories</p>
          <button style={styles.btn} onClick={() => navigate("/admin/assignees")}>
            Go
          </button>
        </div>

        {/* KEYWORDS */}
        <div style={styles.card}>
          <h3>Keyword Rules</h3>
          <p>Set keywords and define priority levels</p>
          <button style={styles.btn} onClick={() => navigate("/admin/keywords")}>
            Go
          </button>
        </div>

        {/* VIEW ALL GRIEVANCES */}
        <div style={styles.card}>
          <h3>View Grievances</h3>
          <p>Track and monitor all complaints in your system</p>
          <button style={styles.btn} onClick={() => navigate("/admin/all-staff")}>
            View
          </button>
        </div>

      </div>

      <button
        style={styles.logout}
        onClick={() => {
          localStorage.clear();
          navigate("/");
        }}
      >
        Logout
      </button>

    </div>
  );
}

const styles = {
  container: {
    padding: "30px",
    textAlign: "center",
    background: "linear-gradient(to right, #eef2f7, #f8fafc)",
    minHeight: "100vh"
  },

  title: {
    fontSize: "28px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#1f2937"
  },

  welcome: {
    marginBottom: "20px",
    color: "#4b5563"
  },

  /* ✅ NEW */
  helperBox: {
    maxWidth: "700px",
    margin: "0 auto 30px auto",
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#374151",
    textAlign: "left",
    lineHeight: "1.6"
  },

  grid: {
    display: "flex",
    gap: "20px",
    justifyContent: "center",
    flexWrap: "wrap"
  },

  card: {
    width: "260px",
    padding: "20px",
    borderRadius: "12px",
    background: "#ffffff",
    border: "1px solid #e5e7eb",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    textAlign: "center"
  },

  btn: {
    marginTop: "10px",
    padding: "10px 15px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
  },

  logout: {
    marginTop: "30px",
    padding: "12px 20px",
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  }
};