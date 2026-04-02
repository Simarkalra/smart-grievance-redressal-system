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
        <h2 style={styles.title}>My Grievances</h2>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/dashboard")}
        >
          ⬅ Back
        </button>
      </div>

      {/* ✅ NEW: INSTRUCTION BOX */}
      <div style={styles.helperBox}>
        <p>
          Here you can track all your submitted grievances:
          <br />
          • <strong>Status</strong> shows progress (Pending, In Progress, Resolved)  
          <br />
          • <strong>Priority</strong> shows urgency (Low → Critical)  
          <br />
          • <strong>Assigned To</strong> shows the staff handling your issue  
        </p>
      </div>

      {/* CONTENT */}
      {data.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No grievances submitted</p>
      ) : (
        <div style={styles.grid}>
          {data.map((g) => (
            <div key={g.id} style={styles.card}>

              <h3 style={styles.titleText}>
                {g.customTitle || g.category?.name || "No Title"}
              </h3>

              <p style={styles.desc}>{g.description}</p>

              {/* STATUS */}
              <div style={styles.row}>
                <span style={styles.label}>Status:</span>
                <span style={styles.status}>{g.status}</span>
              </div>

              {/* PRIORITY */}
              <div style={styles.row}>
                <span style={styles.label}>Priority:</span>
                <span style={styles.priority}>{g.priority}</span>
              </div>

              {/* DEADLINE */}
              <div style={styles.row}>
                <span style={styles.label}>Deadline:</span>
                <span>{g.resolutionDeadline || "-"}</span>
              </div>

              {/* ASSIGNEE */}
              <div style={styles.row}>
                <span style={styles.label}>Assigned To:</span>
                <span>
                  {g.assignee?.username || "Not Assigned"}
                </span>
              </div>

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
    background: "linear-gradient(to right, #eef2f7, #f8fafc)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  title: {
    color: "#1f2937"
  },

  /* ✅ NEW */
  helperBox: {
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#374151",
    marginBottom: "25px",
    lineHeight: "1.6"
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
    padding: "18px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
  },

  titleText: {
    fontSize: "16px",
    fontWeight: "600",
    marginBottom: "8px"
  },

  desc: {
    fontSize: "14px",
    color: "#374151",
    marginBottom: "10px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px"
  },

  label: {
    fontSize: "13px",
    color: "#6b7280"
  },

  status: {
    fontSize: "13px",
    fontWeight: "600"
  },

  priority: {
    fontSize: "13px",
    fontWeight: "600"
  }
};