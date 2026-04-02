import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function CategoryPage() {
  const [name, setName] = useState("");
  const [categories, setCategories] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const orgId = user?.organizationId;

  const load = async () => {
    try {
      const res = await API.get(`/admin/categories?orgId=${orgId}`);

      const sorted = res.data.sort((a, b) =>
        a.name.localeCompare(b.name)
      );

      setCategories(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (orgId) load();
  }, [orgId]);

  const create = async () => {
    const cleanName = name.trim().toLowerCase();

    if (!cleanName) return;

    if (categories.some(c => c.name.toLowerCase() === cleanName)) {
      alert("Category already exists");
      return;
    }

    try {
      await API.post(`/admin/categories?orgId=${orgId}`, {
        name: cleanName
      });

      setName("");
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = categories.filter(c =>
    c.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <div>
          <h2 style={{ margin: 0 }}>Category Management</h2>
          <p style={styles.subText}>
            Create and manage complaint categories
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ⬅ Back
        </button>
      </div>

      {/* ✅ NEW: INSTRUCTION BOX */}
      <div style={styles.helperBox}>
        <p>
          Categories help organize grievances submitted by users.
          <br />
          • Each complaint must belong to a category  
          <br />
          • Categories will be visible to users when raising a grievance  
          <br />
          • Example: <i>Network Issue, Hostel Problem, Fee Issue</i>
        </p>
      </div>

      {/* CREATE CARD */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Create Category</h3>

        {/* ✅ SMALL HELP TEXT */}
        <p style={styles.smallText}>
          Enter a unique category name (e.g., "technical issue")
        </p>

        <div style={styles.row}>
          <input
            placeholder="Enter category name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            style={styles.input}
          />

          <button
            onClick={create}
            disabled={!name.trim()}
            style={styles.primaryBtn}
          >
            Add
          </button>
        </div>
      </div>

      {/* LIST CARD */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Existing Categories</h3>

        {/* SEARCH */}
        <div style={styles.searchRow}>
          <input
            placeholder="Search category..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            style={styles.input}
          />

          <button onClick={() => setSearch("")} style={styles.clearBtn}>
            Clear
          </button>
        </div>

        {/* ✅ SMALL HELP TEXT */}
        <p style={styles.smallText}>
          Showing all categories for your organization
        </p>

        {/* LIST */}
        <div style={styles.list}>
          {filtered.length > 0 ? (
            filtered.map(c => (
              <div key={c.id} style={styles.listItem}>
                {c.name}
              </div>
            ))
          ) : (
            <p style={{ color: "#6b7280" }}>No results found</p>
          )}
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
    marginBottom: "20px"
  },

  subText: {
    marginTop: "5px",
    fontSize: "14px",
    color: "#6b7280"
  },

  backBtn: {
    padding: "8px 12px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "6px",
    cursor: "pointer"
  },

  /* ✅ NEW */
  helperBox: {
    background: "#f1f5f9",
    border: "1px solid #e2e8f0",
    padding: "15px",
    borderRadius: "10px",
    fontSize: "14px",
    color: "#374151",
    marginBottom: "20px",
    lineHeight: "1.6"
  },

  card: {
    background: "#fff",
    padding: "20px",
    borderRadius: "12px",
    marginBottom: "20px",
    boxShadow: "0 4px 12px rgba(0,0,0,0.06)"
  },

  cardTitle: {
    marginBottom: "10px",
    fontSize: "18px",
    fontWeight: "600"
  },

  /* ✅ NEW */
  smallText: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "10px"
  },

  row: {
    display: "flex",
    gap: "10px"
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    flex: 1
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "8px 14px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  searchRow: {
    display: "flex",
    gap: "10px",
    marginBottom: "10px"
  },

  clearBtn: {
    background: "#ef4444",
    color: "#fff",
    border: "none",
    padding: "8px 12px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  list: {
    display: "flex",
    flexDirection: "column",
    gap: "8px"
  },

  listItem: {
    padding: "10px",
    background: "#f9fafb",
    borderRadius: "6px",
    border: "1px solid #e5e7eb"
  }
};