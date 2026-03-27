import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h1>User Dashboard</h1>

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

      {/* ACTION CARDS */}
      <div style={styles.grid}>

        <div style={styles.card}>
          <h3>Create Grievance</h3>
          <p>Submit a new complaint</p>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/create")}
          >
            Open
          </button>
        </div>

        <div style={styles.card}>
          <h3>My Grievances</h3>
          <p>Track your submitted complaints</p>
          <button
            style={styles.primaryBtn}
            onClick={() => navigate("/my")}
          >
            View
          </button>
        </div>

        <div style={styles.card}>
          <h3>Back to Home</h3>
          <p>Return to main page</p>
          <button
            style={styles.secondaryBtn}
            onClick={() => navigate("/")}
          >
            Go
          </button>
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(to right, #eef2f7, #f8fafc)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "25px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    textAlign: "center"
  },

  primaryBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  },

  secondaryBtn: {
    marginTop: "10px",
    padding: "10px",
    background: "#e5e7eb",
    color: "#111827",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  },

  logout: {
    padding: "8px 14px",
    background: "#ef4444",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  }
};