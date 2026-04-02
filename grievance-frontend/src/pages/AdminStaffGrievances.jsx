import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AdminStaffGrievances() {
  const { id } = useParams();
  const [data, setData] = useState([]);

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));
  const orgId = user.organizationId || user.organization?.id;

  const load = () => {
    API.get(`/grievances/assignee/${id}?orgId=${orgId}`)
      .then(res => setData(res.data))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    load();
  }, [id]);

  const getStatusColor = (status) => {
    switch (status) {
      case "RESOLVED": return "#16a34a";
      case "IN_PROGRESS": return "#f59e0b";
      default: return "#ef4444";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "CRITICAL": return "#dc2626";
      case "HIGH": return "#ea580c";
      case "MEDIUM": return "#2563eb";
      default: return "#16a34a";
    }
  };

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Staff Grievances</h2>
          <p style={styles.subText}>
            View all grievances assigned to this staff
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate(-1)}>
          ⬅ Back
        </button>
      </div>

      {/* ✅ NEW: INSTRUCTION BOX */}
      <div style={styles.helperBox}>
        <p>
          This page shows all grievances assigned to a specific staff member.
          <br />
          • <strong>Status</strong> indicates progress (Pending, In Progress, Resolved)  
          <br />
          • <strong>Priority</strong> shows urgency (Low → Critical)  
          <br />
          • Helps monitor workload and response efficiency  
        </p>
      </div>

      {/* CONTENT */}
      {data.length === 0 ? (
        <p style={{ color: "#6b7280" }}>No grievances found</p>
      ) : (
        <div style={styles.grid}>
          {data.map(g => (
            <div key={g.id} style={styles.card}>

              <h3 style={styles.title}>
                {g.customTitle || g.category?.name || "No Title"}
              </h3>

              <p style={styles.desc}>{g.description}</p>

              {/* STATUS */}
              <div style={styles.row}>
                <span style={styles.label}>Status:</span>
                <span
                  style={{
                    ...styles.badge,
                    background: getStatusColor(g.status)
                  }}
                >
                  {g.status}
                </span>
              </div>

              {/* PRIORITY */}
              <div style={styles.row}>
                <span style={styles.label}>Priority:</span>
                <span
                  style={{
                    ...styles.badge,
                    background: getPriorityColor(g.priority)
                  }}
                >
                  {g.priority}
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
    alignItems: "center",
    marginBottom: "20px"
  },

  subText: {
    marginTop: "5px",
    fontSize: "14px",
    color: "#6b7280"
  },

  backBtn: {
    padding: "8px 14px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "600"
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

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
  },

  title: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "10px",
    color: "#111827"
  },

  desc: {
    fontSize: "14px",
    color: "#374151",
    marginBottom: "15px"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "8px"
  },

  label: {
    fontSize: "13px",
    color: "#6b7280"
  },

  badge: {
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600"
  }
};