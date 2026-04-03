import { useEffect, useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function AssigneeDashboard() {
  const [data, setData] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const load = () => {
    const orgId = user.organizationId || user.organization?.id;

    API.get(`/grievances/assignee/${user.id}?orgId=${orgId}`)
      .then(res => setData(res.data || []))
      .catch(err => console.error(err));
  };

  useEffect(() => {
    load();
  }, []);

  const searched = data.filter(g =>
    g.description?.toLowerCase().includes(search.toLowerCase())
  );

  const pending = searched.filter(g => g.status === "PENDING");
  const inProgress = searched.filter(g => g.status === "IN_PROGRESS");
  const resolved = searched.filter(g => g.status === "RESOLVED");

  const getPriorityColor = (priority) => {
    switch (priority) {
      case "CRITICAL": return "#dc2626";
      case "HIGH": return "#ea580c";
      case "MEDIUM": return "#2563eb";
      default: return "#16a34a";
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case "RESOLVED": return "#16a34a";
      case "IN_PROGRESS": return "#f59e0b";
      default: return "#ef4444";
    }
  };

  const deleteGrievance = (id) => {
    if (!window.confirm("Delete this grievance?")) return;

    API.delete(`/grievances/${id}`)
      .then(() => load())
      .catch(err => console.error(err));
  };

  const updatePriority = (id, priority) => {
    API.put(`/grievances/${id}/priority?priority=${priority}`)
      .then(() => load())
      .catch(err => console.error(err));
  };

  const updateStatus = (id, status) => {
    API.put(`/grievances/${id}/status?status=${status}`)
      .then(() => load())
      .catch(err => console.error(err));
  };

  
  const renderCard = (g) => (
    <div key={g.id} style={styles.card}>

      <h3 style={styles.title}>
        {g.customTitle || g.category?.name || "No Title"}
      </h3>

      <p style={styles.desc}>{g.description}</p>

      <div style={styles.row}>
        <span style={styles.label}>Priority</span>
        <span style={{
          ...styles.badge,
          background: getPriorityColor(g.priority)
        }}>
          {g.priority}
        </span>
      </div>

      <select
        value={g.priority}
        onChange={(e) => updatePriority(g.id, e.target.value)}
        style={styles.select}
      >
        <option value="LOW">LOW</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HIGH">HIGH</option>
        <option value="CRITICAL">CRITICAL</option>
      </select>

      <div style={styles.row}>
        <span style={styles.label}>Status</span>
        <span style={{
          ...styles.badge,
          background: getStatusColor(g.status)
        }}>
          {g.status}
        </span>
      </div>

      <select
        value={g.status}
        onChange={(e) => updateStatus(g.id, e.target.value)}
        style={styles.select}
      >
        <option value="PENDING">PENDING</option>
        <option value="IN_PROGRESS">IN_PROGRESS</option>
        <option value="RESOLVED">RESOLVED</option>
      </select>

      <button
        style={styles.deleteBtn}
        onClick={() => deleteGrievance(g.id)}
      >
        Delete
      </button>
    </div>
  );

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>Assigned Grievances</h2>

        <button style={styles.backBtn} onClick={() => navigate("/")}>
          ⬅ Back
        </button>
      </div>

      {/* SEARCH */}
      <div style={styles.searchBar}>
        <input
          placeholder="Search grievance..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          style={styles.input}
        />

        <button onClick={() => setSearch("")} style={styles.clearBtn}>
          Clear
        </button>
      </div>

      {/* KANBAN */}
      <div style={styles.columns}>

        <div>
          <h3 style={styles.columnTitle}>🟡 Pending</h3>
          {pending.length === 0 ? <p>Empty</p> : pending.map(renderCard)}
        </div>

        <div>
          <h3 style={styles.columnTitle}>🟠 In Progress</h3>
          {inProgress.length === 0 ? <p>Empty</p> : inProgress.map(renderCard)}
        </div>

        <div>
          <h3 style={styles.columnTitle}>🟢 Resolved</h3>
          {resolved.length === 0 ? <p>Empty</p> : resolved.map(renderCard)}
        </div>

      </div>

    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "25px",
    background: "linear-gradient(to right, #eef2f7, #f8fafc)"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "20px"
  },

  searchBar: {
    display: "flex",
    gap: "10px",
    marginBottom: "20px"
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    width: "100%",
    maxWidth: "250px"
  },

  clearBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px"
  },

  backBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px"
  },

  columns: {
    display: "grid",
    gridTemplateColumns: "repeat(3, 1fr)",
    gap: "20px"
  },

  columnTitle: {
    marginBottom: "10px"
  },

  card: {
    background: "#fff",
    padding: "15px",
    borderRadius: "10px",
    marginBottom: "10px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.06)"
  },

  title: {
    fontSize: "16px",
    fontWeight: "600"
  },

  desc: {
    fontSize: "14px",
    margin: "8px 0"
  },

  row: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: "6px"
  },

  label: {
    fontSize: "12px",
    color: "#6b7280"
  },

  badge: {
    color: "#fff",
    padding: "3px 8px",
    borderRadius: "6px",
    fontSize: "12px"
  },

  select: {
    width: "100%",
    marginBottom: "8px",
    padding: "6px",
    borderRadius: "6px"
  },

  deleteBtn: {
    background: "#dc2626",
    color: "#fff",
    border: "none",
    padding: "6px",
    borderRadius: "6px",
    width: "100%"
  }
};