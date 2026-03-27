import { useNavigate } from "react-router-dom";

export default function SelectRole() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.title}>Select Login Type</h2>
        <p style={styles.subtitle}>
          Choose how you want to access the system
        </p>

        <div style={styles.buttons}>

          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/login/user")}
          >
            👤 Login as User
          </button>

          <button
            style={styles.adminBtn}
            onClick={() => navigate("/login/admin")}
          >
            🛠 Login as Admin
          </button>

          <button
            style={styles.staffBtn}
            onClick={() => navigate("/login/assignee")}
          >
            👨‍💼 Login as Assignee
          </button>

        </div>

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
    width: "360px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    textAlign: "center"
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "8px"
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px"
  },

  buttons: {
    display: "flex",
    flexDirection: "column",
    gap: "12px"
  },

  primaryBtn: {
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  },

  adminBtn: {
    padding: "12px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  },

  staffBtn: {
    padding: "12px",
    background: "#f59e0b",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  }
};