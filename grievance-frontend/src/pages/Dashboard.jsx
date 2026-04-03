import { useNavigate } from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user")) || {};

  return (
    <div style={styles.container}>
      {/* Banner */}
      <div style={styles.banner}>
        <div style={styles.bannerOverlay}>
          <h1 style={styles.title}>User Dashboard</h1>
          <p style={styles.bannerText}>Welcome back, {user.username || "User"}. Manage your grievances here.</p>
        </div>
      </div>

      <div style={styles.content}>
        <div style={styles.header}>
          <h2 style={styles.sectionTitle}>Overview</h2>
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

        <div style={styles.grid}>
          <div style={styles.card}>
            <div style={styles.cardIcon}>✍️</div>
            <h3 style={styles.cardTitle}>Create Grievance</h3>
            <p style={styles.cardDesc}>Submit a new complaint to your organization efficiently.</p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/create")}
            >
              Open Form
            </button>
          </div>

          <div style={styles.card}>
            <div style={styles.cardIcon}>📋</div>
            <h3 style={styles.cardTitle}>My Grievances</h3>
            <p style={styles.cardDesc}>View status and track updates of your submitted complaints.</p>
            <button
              style={styles.primaryBtn}
              onClick={() => navigate("/my")}
            >
              View Record
            </button>
          </div>

          <div style={styles.card}>
             <div style={styles.cardIcon}>🏠</div>
            <h3 style={styles.cardTitle}>Back to Home</h3>
            <p style={styles.cardDesc}>Return to the main landing page to join other systems.</p>
            <button
              style={styles.secondaryBtn}
              onClick={() => navigate("/")}
            >
              Go Home
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
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
  },
  banner: {
    width: "100%",
    height: "250px",
    backgroundImage: "url('/dashboard_banner.png')",
    backgroundSize: "cover",
    backgroundPosition: "center",
    position: "relative"
  },
  bannerOverlay: {
    position: "absolute",
    inset: 0,
    background: "linear-gradient(to right, rgba(15, 23, 42, 0.8), rgba(15, 23, 42, 0.4))",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    padding: "0 60px"
  },
  title: {
    color: "#fff",
    fontSize: "36px",
    fontWeight: "800",
    marginBottom: "10px",
  },
  bannerText: {
    color: "#cbd5e1",
    fontSize: "16px",
    fontWeight: "500"
  },
  content: {
    maxWidth: "1200px",
    margin: "-50px auto 0",
    position: "relative",
    zIndex: 10,
    padding: "0 20px"
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "30px",
    background: "rgba(255, 255, 255, 0.9)",
    backdropFilter: "blur(10px)",
    padding: "15px 30px",
    borderRadius: "15px",
    boxShadow: "0 10px 15px -3px rgba(0,0,0,0.05)"
  },
  sectionTitle: {
    color: "#1e293b",
    fontSize: "20px",
    fontWeight: "700"
  },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(320px, 1fr))",
    gap: "30px",
    paddingBottom: "50px"
  },
  card: {
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    padding: "40px 30px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.08)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    textAlign: "center",
    transition: "transform 0.3s, box-shadow 0.3s"
  },
  cardIcon: {
    fontSize: "40px",
    marginBottom: "15px"
  },
  cardTitle: {
    fontSize: "22px",
    fontWeight: "700",
    color: "#0f172a",
    marginBottom: "10px"
  },
  cardDesc: {
    fontSize: "15px",
    color: "#64748b",
    marginBottom: "25px",
    lineHeight: "1.5"
  },
  primaryBtn: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  secondaryBtn: {
    width: "100%",
    padding: "14px",
    background: "#ffffff",
    color: "#312e81",
    border: "2px solid #e0e7ff",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "15px",
    cursor: "pointer",
    transition: "background 0.2s, border 0.2s"
  },
  logout: {
    padding: "10px 20px",
    background: "rgba(239, 68, 68, 0.1)",
    color: "#ef4444",
    border: "1px solid rgba(239, 68, 68, 0.2)",
    borderRadius: "8px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "background 0.2s"
  }
};