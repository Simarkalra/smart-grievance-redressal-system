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

        {/* ✅ NEW: INSTRUCTION BOX */}
        <div style={styles.helperBox}>
          <p>
            Follow these steps to configure your system before users start submitting grievances:
            <br />
            1️⃣ Create categories → Define complaint types  
            <br />
            2️⃣ Assign staff → Handle complaints  
            <br />
            3️⃣ Set keywords → Automatically assign priority  
          </p>
        </div>

        <div style={styles.steps}>

          {/* STEP 1 */}
          <div style={styles.stepCard}>
            <div>
              <h3>1. Create Categories</h3>
              <p>Define complaint categories for your organization</p>
            </div>

            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/admin/categories")}
            >
              Open
            </button>
          </div>

          {/* STEP 2 */}
          <div style={styles.stepCard}>
            <div>
              <h3>2. Assign Assignees</h3>
              <p>Add staff and assign them to categories</p>
            </div>

            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/admin/assignees")}
            >
              Open
            </button>
          </div>

          {/* STEP 3 */}
          <div style={styles.stepCard}>
            <div>
              <h3>3. Keyword Rules</h3>
              <p>Set priority rules based on keywords</p>
            </div>

            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/admin/keywords")}
            >
              Open
            </button>
          </div>

        </div>

        {/* ✅ SMALL NOTE */}
        <p style={styles.smallText}>
          You can complete these steps in any order, but all are recommended for best system performance.
        </p>

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
    width: "100%",
    maxWidth: "600px",
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
    marginBottom: "15px"
  },

  /* ✅ NEW */
  helperBox: {
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#374151",
    marginBottom: "20px",
    lineHeight: "1.6",
    textAlign: "left"
  },

  steps: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
    marginBottom: "15px"
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

  /* ✅ NEW */
  smallText: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "15px"
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