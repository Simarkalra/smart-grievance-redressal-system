import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AdminAllStaffPage() {
  const [staffs, setStaffs] = useState([]);
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const orgId = user.organizationId || user.organization?.id;

  useEffect(() => {
    API.get(`/admin/users?orgId=${orgId}`)
      .then(res => {
        const onlyStaff = res.data.filter(u => u.role === "STAFF");
        setStaffs(onlyStaff);
      })
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>All Staff</h2>
          <p style={styles.subText}>
            View and monitor staff grievance handling
          </p>
        </div>

        <button
          style={styles.backBtn}
          onClick={() => navigate("/admin")}
        >
          ⬅ Back
        </button>
      </div>

      {/* ✅ NEW: INSTRUCTION BOX */}
      <div style={styles.helperBox}>
        <p>
          This page shows all staff members in your organization.
          <br />
          • View assigned categories for each staff  
          <br />
          • Click on a staff card to see detailed grievance activity  
          <br />
          • Helps monitor workload and performance  
        </p>
      </div>

      {/* GRID */}
      <div style={styles.grid}>
        {staffs.length === 0 ? (
          <p style={{ color: "#6b7280" }}>No staff found</p>
        ) : (
          staffs.map(staff => (
            <div
              key={staff.id}
              onClick={() => navigate(`/admin/staff/${staff.id}`)}
              style={styles.card}
            >
              <h3 style={styles.name}>{staff.username}</h3>

              <p style={styles.label}>Assigned Categories</p>
              <p style={styles.categories}>
                {staff.categories?.length
                  ? staff.categories.map(c => c.name).join(", ")
                  : "Not Assigned"}
              </p>

              <div style={styles.footer}>
                <span style={styles.viewText}>Click to view details →</span>
              </div>
            </div>
          ))
        )}
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
    gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))",
    gap: "20px"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    border: "1px solid #e5e7eb",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)",
    cursor: "pointer",
    transition: "0.2s",
    display: "flex",
    flexDirection: "column",
    justifyContent: "space-between",
    minHeight: "140px"
  },

  name: {
    fontSize: "18px",
    fontWeight: "600",
    marginBottom: "8px",
    color: "#111827"
  },

  label: {
    fontSize: "12px",
    color: "#9ca3af",
    marginBottom: "2px"
  },

  categories: {
    fontSize: "14px",
    color: "#374151"
  },

  footer: {
    marginTop: "10px",
    textAlign: "right"
  },

  viewText: {
    fontSize: "13px",
    color: "#2563eb",
    fontWeight: "500"
  }
};