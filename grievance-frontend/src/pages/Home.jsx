import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <div style={styles.wrapper}>
        <h1 style={styles.title}>Grievance Management System</h1>
        <p style={styles.subtitle}>
          Manage complaints efficiently with a structured system
        </p>

        <div style={styles.grid}>

          {/* CREATE SYSTEM */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Create System</h2>
            <p style={styles.cardText}>
              Setup a new grievance system as an admin
            </p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/create-system")}
            >
              Create (Admin)
            </button>
          </div>

          {/* JOIN SYSTEM */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Join System</h2>
            <p style={styles.cardText}>
              Register as a user or staff in an existing system
            </p>
            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/join-system")}
            >
              Register
            </button>
          </div>

          {/* LOGIN */}
          <div style={styles.card}>
            <h2 style={styles.cardTitle}>Login</h2>
            <p style={styles.cardText}>
              Access your dashboard and manage grievances
            </p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/login")}
            >
              Login
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    background: "linear-gradient(to right, #eef2f7, #f8fafc)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },

  wrapper: {
    textAlign: "center",
    maxWidth: "1000px",
    width: "100%"
  },

  title: {
    fontSize: "36px",
    fontWeight: "700",
    marginBottom: "10px",
    color: "#1f2937"
  },

  subtitle: {
    fontSize: "16px",
    color: "#6b7280",
    marginBottom: "40px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))",
    gap: "25px"
  },

  card: {
    background: "#ffffff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    textAlign: "center",
    transition: "0.3s",
    border: "1px solid #e5e7eb"
  },

  cardTitle: {
    fontSize: "20px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#111827"
  },

  cardText: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px"
  },

  primaryBtn: {
    padding: "10px 18px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s"
  },

  secondaryBtn: {
    padding: "10px 18px",
    background: "#10b981",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600",
    transition: "0.2s"
  }
};