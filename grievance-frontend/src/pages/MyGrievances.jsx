import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyGrievances() {
  const [data, setData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    API.get(`/grievances/reported/${user.id}`)
      .then((res) => setData(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>My Grievances</h2>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Back
        </button>
      </div>

      {/* CONTENT */}
      {data.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No grievances submitted</p>
      ) : (
        <div style={styles.grid}>
          {data.map((g) => (
            <div key={g.id} style={styles.card}>

              <h3>
                {g.customTitle || g.category?.name || "No Title"}
              </h3>

              <p>{g.description}</p>

              <p><strong>Priority:</strong> {g.priority}</p>
              <p><strong>Status:</strong> {g.status}</p>
              <p><strong>Deadline:</strong> {g.resolutionDeadline || "-"}</p>
              <p><strong>Assigned To:</strong> {g.assignee?.username || "Not Assigned"}</p>

            </div>
          ))}
        </div>
      )}

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "#f5f7fa"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  backBtn: {
    padding: "8px 12px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    border: "1px solid #ddd"
  }
};