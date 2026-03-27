import { useNavigate } from "react-router-dom";

export default function AdminSetup() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.title}>System Setup</h2>
        <p style={styles.subtitle}>
          Complete the initial setup of your grievance system
        </p>

        <div style={styles.steps}>

          <div style={styles.stepCard}>
            <h3>Create Categories</h3>
            <p>Define complaint categories for your organization</p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/admin/categories")}
            >
              Open
            </button>
          </div>

          <div style={styles.stepCard}>
            <h3>Assign Assignees</h3>
            <p>Add staff and assign them to categories</p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/admin/assignees")}
            >
              Open
            </button>
          </div>

          <div style={styles.stepCard}>
            <h3>Keyword Rules</h3>
            <p>Set priority rules based on keywords</p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/admin/keywords")}
            >
              Open
            </button>
          </div>

        </div>

        {/* FINISH BUTTON */}
        <button
          style={styles.finishBtn}
          onClick={() => navigate("/dashboard")}
        >
          Finish Setup
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
    width: "600px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    textAlign: "center"
  },

  title: {
    fontSize: "26px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#1f2937"
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "25px"
  },

  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "25px"
  },

  stepCard: {
    border: "1px solid #e5e7eb",
    borderRadius: "10px",
    padding: "15px",
    textAlign: "left",
    background: "#fafafa",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center"
  },

  primaryBtn: {
    padding: "8px 14px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "6px",
    fontWeight: "600",
    cursor: "pointer"
  },

  finishBtn: {
    width: "100%",
    padding: "12px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  }
};