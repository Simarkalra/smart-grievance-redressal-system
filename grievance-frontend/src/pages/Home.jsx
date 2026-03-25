import { useNavigate } from "react-router-dom";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div style={styles.container}>
      <h1 style={styles.title}>Grievance Management System</h1>

      <div style={styles.grid}>

        <div style={styles.card}>
          <h2>Create Your System</h2>
          <button
            style={styles.button}
            onClick={() => navigate("/create-system")}
          >
            Create (Admin)
          </button>
        </div>

        <div style={styles.card}>
          <h2>Join Existing System</h2>
          <button
            style={styles.button}
            onClick={() => navigate("/join-system")}
          >
            Register (User/Staff)
          </button>
        </div>

        <div style={styles.card}>
          <h2>Login</h2>
          <button
            style={styles.button}
            onClick={() => navigate("/login")}
          >
            Login to System
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
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    background: "#f5f7fa"
  },

  title: {
    marginBottom: "40px",
    fontSize: "32px",
    fontWeight: "bold"
  },

  grid: {
    display: "flex",
    gap: "30px",
    flexWrap: "wrap",
    justifyContent: "center"
  },

  card: {
    width: "260px",
    padding: "30px",
    background: "#fff",
    borderRadius: "12px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
    textAlign: "center"
  },

  button: {
    marginTop: "15px",
    padding: "10px 20px",
    background: "#007bff",
    color: "white",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold"
  }
};