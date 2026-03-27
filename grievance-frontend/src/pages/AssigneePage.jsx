import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

export default function AssigneePage() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [categories, setCategories] = useState([]);
  const [categoryId, setCategoryId] = useState("");
  const [assignees, setAssignees] = useState([]);
  const [search, setSearch] = useState("");

  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));
  const orgId = user?.organizationId || user?.organization?.id;

  // ✅ ASSIGN CATEGORY
  const assignCategory = async (userId, categoryId) => {
    try {
      await API.put("/admin/assign-category", {
        userId: String(userId),
        categoryId: String(categoryId)
      });
      load();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ REMOVE CATEGORY (REAL API)
  const removeCategory = async (userId, categoryId) => {
    try {
      await API.delete(
        `/admin/remove-category?userId=${userId}&categoryId=${categoryId}`
      );
      load();
    } catch (err) {
      console.error(err);
    }
  };

  // ✅ LOAD DATA
  const load = async () => {
    try {
      const catRes = await API.get(`/admin/categories?orgId=${orgId}`);
      setCategories(catRes.data);

      const userRes = await API.get(`/admin/users?orgId=${orgId}`);
      setAssignees(userRes.data);
    } catch (err) {
      console.error(err);
    }
  };

  useEffect(() => {
    if (orgId) load();
  }, [orgId]);

  // ✅ CREATE STAFF
  const create = async () => {
    if (!username.trim() || !password.trim() || !categoryId) {
      alert("Fill all fields");
      return;
    }

    try {
      await API.post(`/admin/users?orgId=${orgId}`, {
        username,
        password,
        categoryId
      });

      setUsername("");
      setPassword("");
      setCategoryId("");
      load();
    } catch (err) {
      console.error(err);
    }
  };

  const filtered = assignees
    .filter(a => a.role === "STAFF")
    .filter(a =>
      a.username.toLowerCase().includes(search.toLowerCase())
    );

  return (
    <div style={styles.container}>

      {/* HEADER */}
      <div style={styles.header}>
        <h2>Manage Assignees</h2>
        <button style={styles.backBtn} onClick={() => navigate("/admin")}>
          ⬅ Back
        </button>
      </div>

      {/* CREATE */}
      <div style={styles.createBox}>
        <input
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          style={styles.input}
        />

        <input
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
        />

        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          style={styles.input}
        >
          <option value="">Select Category</option>
          {categories.map(c => (
            <option key={c.id} value={c.id}>{c.name}</option>
          ))}
        </select>

        <button style={styles.primaryBtn} onClick={create}>
          Create
        </button>
      </div>

      {/* SEARCH */}
      <input
        placeholder="Search staff..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        style={{ ...styles.input, width: "300px", marginBottom: 20 }}
      />

      {/* TABLE */}
      <div style={styles.tableContainer}>
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>Username</th>
              <th style={styles.th}>Assigned Category</th>
              <th style={styles.th}>Assign New</th>
            </tr>
          </thead>

          <tbody>
            {filtered.map(a => (
              <tr key={a.id}>
                <td style={styles.td}>{a.username}</td>

                {/* ASSIGNED */}
                <td style={styles.td}>
                  {a.categories?.length ? (
                    a.categories.map(c => (
                      <div key={c.id} style={{ marginBottom: 5 }}>
                        {c.name}
                        <button
                          onClick={() => removeCategory(a.id, c.id)}
                          style={styles.removeBtn}
                        >
                          ✕
                        </button>
                      </div>
                    ))
                  ) : (
                    "Not Assigned"
                  )}
                </td>

                {/* ASSIGN */}
                <td style={styles.td}>
                  <select
                    onChange={(e) => assignCategory(a.id, e.target.value)}
                    style={styles.select}
                  >
                    <option value="">Assign Category</option>
                    {categories.map(c => (
                      <option key={c.id} value={c.id}>
                        {c.name}
                      </option>
                    ))}
                  </select>
                </td>

              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

const styles = {
  container: {
    padding: 30,
    background: "#f5f7fa",
    minHeight: "100vh"
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20
  },

  backBtn: {
    padding: "6px 12px",
    background: "#64748b",
    color: "white",
    border: "none",
    borderRadius: 6
  },

  createBox: {
    display: "flex",
    gap: 10,
    marginBottom: 20,
    flexWrap: "wrap"
  },

  input: {
    padding: 8,
    borderRadius: 6,
    border: "1px solid #ccc"
  },

  primaryBtn: {
    background: "#2563eb",
    color: "white",
    border: "none",
    padding: "8px 14px",
    borderRadius: 6
  },

  tableContainer: {
    background: "#fff",
    borderRadius: 10,
    padding: 10,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)"
  },

  table: {
    width: "100%",
    borderCollapse: "collapse"
  },

  th: {
    textAlign: "left",
    padding: "12px",
    background: "#f1f5f9"
  },

  td: {
    padding: "12px",
    borderBottom: "1px solid #e5e7eb"
  },

  select: {
    padding: "6px",
    borderRadius: 6,
    border: "1px solid #ccc"
  },

  removeBtn: {
    marginLeft: 8,
    background: "#ef4444",
    color: "white",
    border: "none",
    borderRadius: 4,
    padding: "2px 6px",
    cursor: "pointer"
  }
};