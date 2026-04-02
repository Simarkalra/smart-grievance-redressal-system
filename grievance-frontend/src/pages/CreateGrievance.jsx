import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Modal from "../components/Modal";

export default function CreateGrievance() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    title: "",
    description: ""
  });

  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    if (!user || !user.organizationId) {
      console.warn("No organization found for user");
      return;
    }

    API.get(`/admin/categories?orgId=${user.organizationId}`)
      .then((res) => {
        setCategories(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
        setCategories([]);
      });
  }, []);

  const submit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      if (!user) {
        alert("User not logged in");
        return;
      }

      if (!selectedCategory) {
        alert("Please select category");
        return;
      }

      if (!data.description.trim()) {
        alert("Description required");
        return;
      }

      const payload = {
        description: data.description,
        category: { id: parseInt(selectedCategory) }
      };

      await API.post(`/grievances?userId=${user.id}`, payload);

      setModal({
        isOpen: true,
        title: "Success",
        message: "Grievance submitted successfully",
        type: "success"
      });

      setTimeout(() => navigate("/dashboard"), 1500);

    } catch (err) {
      console.error("Submission error", err);

      setModal({
        isOpen: true,
        title: "Error",
        message: "Failed to submit grievance",
        type: "error"
      });
    }
  };

  return (
    <div style={styles.container}>
      <h2 style={styles.title}>Create Grievance</h2>

      {/* ✅ NEW: INSTRUCTION BOX */}
      <div style={styles.helperBox}>
        <p>
          Submit your complaint by selecting a category and describing your issue clearly.
          <br />
          • Choose the most relevant category  
          <br />
          • Provide detailed description for faster resolution  
        </p>
      </div>

      {/* CATEGORY */}
      <label style={styles.label}>Select Category</label>
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
        style={styles.input}
      >
        <option value="">Select Category</option>

        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      {/* ✅ SMALL HELP */}
      <p style={styles.smallText}>
        Categories are defined by your organization admin
      </p>

      {/* DESCRIPTION */}
      <label style={styles.label}>Description</label>
      <textarea
        placeholder="Describe your issue in detail..."
        value={data.description}
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
        style={styles.textarea}
      />

      {/* ✅ SMALL HELP */}
      <p style={styles.smallText}>
        Include important details like location, time, and issue severity
      </p>

      {/* BUTTONS */}
      <div style={styles.buttonRow}>
        <button onClick={submit} style={styles.primaryBtn}>
          Submit
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.secondaryBtn}
        >
          Cancel
        </button>
      </div>

      {/* MODAL */}
      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => {
          setModal({ ...modal, isOpen: false });
          if (modal.type === "success") navigate("/dashboard");
        }}
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    padding: "30px",
    background: "linear-gradient(to right, #eef2f7, #f8fafc)"
  },

  title: {
    marginBottom: "20px",
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
    marginBottom: "20px",
    lineHeight: "1.6"
  },

  label: {
    display: "block",
    marginBottom: "5px",
    fontWeight: "500"
  },

  input: {
    width: "100%",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    marginBottom: "5px"
  },

  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc"
  },

  /* ✅ NEW */
  smallText: {
    fontSize: "12px",
    color: "#6b7280",
    marginBottom: "15px"
  },

  buttonRow: {
    marginTop: "15px",
    display: "flex",
    gap: "10px"
  },

  primaryBtn: {
    background: "#2563eb",
    color: "#fff",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  },

  secondaryBtn: {
    background: "#e5e7eb",
    border: "none",
    padding: "10px 16px",
    borderRadius: "6px",
    cursor: "pointer"
  }
};