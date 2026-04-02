import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function KeywordPage() {
  const [keyword, setKeyword] = useState("");
  const [priority, setPriority] = useState("LOW");
  const [rules, setRules] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const orgId = user?.organizationId;

  const load = async () => {
    try {
      const res = await API.get(`/admin/rules?orgId=${orgId}`);
      const sorted = res.data.sort((a, b) =>
        a.keyword.localeCompare(b.keyword)
      );
      setRules(sorted);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (orgId) load();
  }, [orgId]);

  const create = async () => {
    const cleanKeyword = keyword.trim().toLowerCase();
    if (!cleanKeyword) return;

    try {
      await API.post(`/admin/rules?orgId=${orgId}`, {
        keyword: cleanKeyword,
        priority
      });

      setKeyword("");
      setPriority("LOW");
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = rules.filter(r =>
    r.keyword.toLowerCase().includes(search.toLowerCase())
  );

  const getPriorityColor = (p) => {
    switch (p) {
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
          <h2 style={{ margin: 0 }}>Keyword Rules</h2>
          <p style={styles.subText}>
            Define priority based on keywords
          </p>
        </div>

        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ⬅ Back
        </button>
      </div>

      {/* ✅ NEW: INSTRUCTION BOX */}
      <div style={styles.helperBox}>
        <p>
          Keywords help automatically assign priority to grievances.
          <br />
          • If a complaint contains a keyword, its priority is set automatically  
          <br />
          • Example: <i>"urgent", "failure", "not working"</i>  
          <br />
          • Higher priority → Faster response and handling  
        </p>
      </div>

      {/* CREATE CARD */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Create Rule</h3>

        {/* ✅ SMALL HELP TEXT */}
        <p style={styles.smallText}>
          Add keywords that define how urgent a complaint is
        </p>

        <div style={styles.row}>
          <input
            placeholder="Keyword (e.g. urgent)"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            style={styles.input}
          />

          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value)}
            style={styles.input}
          >
            <option value="LOW">LOW</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HIGH">HIGH</option>
            <option value="CRITICAL">CRITICAL</option>
          </select>

          <button onClick={create} style={styles.primaryBtn}>
            Add
          </button>
        </div>
      </div>

      {/* TABLE CARD */}
      <div style={styles.card}>
        <h3 style={styles.cardTitle}>Existing Rules</h3>

        {/* SEARCH */}
        <div style={styles.searchRow}>
          <input
            placeholder="Search keyword..."
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
          Showing all keyword-based priority rules
        </p>

        {/* TABLE */}
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Keyword</th>
              <th style={styles.th}>Priority</th>
            </tr>
          </thead>

          <tbody>
            {filtered.length > 0 ? (
              filtered.map((r) => (
                <tr key={r.id}>
                  <td style={styles.td}>{r.keyword}</td>
                  <td style={styles.td}>
                    <span
                      style={{
                        ...styles.badge,
                        background: getPriorityColor(r.priority)
                      }}
                    >
                      {r.priority}
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="2" style={{ textAlign: "center", padding: 15 }}>
                  No results found
                </td>
              </tr>
            )}
          </tbody>
        </table>

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
    gap: "10px",
    flexWrap: "wrap"
  },

  input: {
    padding: "8px",
    borderRadius: "6px",
    border: "1px solid #ccc"
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

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    textAlign: "left",
    padding: "12px",
    borderBottom: "2px solid #e5e7eb"
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb"
  },

  badge: {
    color: "#fff",
    padding: "4px 10px",
    borderRadius: "8px",
    fontSize: "12px",
    fontWeight: "600"
  }
};