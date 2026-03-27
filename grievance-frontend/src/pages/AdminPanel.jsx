import { useNavigate } from "react-router-dom";
import { container, card, input, primaryBtn } from "../styles/ui";

export default function AdminPanel() {
  const navigate = useNavigate();


  const handleLogout = () => {
  localStorage.removeItem("user");
  navigate("/login");
};

  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div style={styles.container}>
      <h2>Admin Dashboard</h2>

      <p style={{ marginBottom: 20 }}>
        Welcome, <b>{user?.username}</b>
      </p>

      <div style={styles.grid}>

        {/* CREATE CATEGORY */}
        <div style={styles.card}>
          <h3>Manage Categories</h3>
          <p>Create and assign categories</p>
          <button onClick={() => navigate("/admin/categories")}>
            Go
          </button>
        </div>

        {/* ASSIGNEES */}
        <div style={styles.card}>
          <h3>Manage Assignees</h3>
          <p>Create staff and assign roles</p>
          <button onClick={() => navigate("/admin/assignees")}>
            Go
          </button>
        </div>

        {/* KEYWORDS */}
        <div style={styles.card}>
          <h3>Keyword Rules</h3>
          <p>Set priority rules</p>
          <button onClick={() => navigate("/admin/keywords")}>
            Go
          </button>
        </div>

        {/* VIEW ALL GRIEVANCES */}
        <div style={styles.card}>
          <h3>View Grievances</h3>
          <p>Track all complaints</p>
       <button onClick={() => navigate("/admin/all-staff")}>
  View
</button>
        </div>

      </div>

      <button style={styles.logout} onClick={() => {
        localStorage.clear();
        navigate("/");
      }}>
        Logout
      </button>
     
    </div>
  );
}

const styles = {
  container: {
    padding: 20,
    textAlign: "center"
  },

  grid: {
    display: "flex",
    gap: 20,
    justifyContent: "center",
    flexWrap: "wrap"
  },

  card: {
    width: 250,
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 10,
    boxShadow: "0 2px 6px rgba(0,0,0,0.1)"
  },

  logout: {
    marginTop: 30,
    padding: "10px 20px",
    background: "red",
    color: "white",
    border: "none",
    borderRadius: 6
  }
};