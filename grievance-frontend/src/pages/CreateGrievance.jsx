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
  const [loading, setLoading] = useState(false);

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

      setLoading(true);

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
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>
      <div 
        style={styles.backButton} 
        onClick={() => navigate("/dashboard")}
      >
        ← Back to Dashboard
      </div>

      <div style={styles.card}>
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
        <option value="-1">Other / Not Listed</option>
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
        <button onClick={submit} style={{ ...styles.primaryBtn, opacity: loading ? 0.7 : 1 }} disabled={loading}>
          {loading ? "Submitting..." : "Submit"}
        </button>

        <button
          onClick={() => navigate("/dashboard")}
          style={styles.secondaryBtn}
        >
          Cancel
        </button>
      </div>
      </div>
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
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  card: {
    width: "100%",
    maxWidth: "500px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255, 255, 255, 0.6)"
  },
  backButton: {
    cursor: "pointer",
    color: "#4f46e5",
    fontWeight: "600",
    marginBottom: "20px",
    alignSelf: "flex-start",
    marginLeft: "max(calc(50vw - 250px), 20px)",
    fontSize: "15px",
    transition: "color 0.2s"
  },
  title: {
    marginBottom: "20px",
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a",
    textAlign: "center"
  },
  helperBox: {
    background: "rgba(241, 245, 249, 0.8)",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#334155",
    marginBottom: "20px",
    lineHeight: "1.6"
  },
  label: {
    display: "block",
    marginBottom: "6px",
    fontWeight: "600",
    color: "#1e293b",
    fontSize: "14px"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "6px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
    background: "#fff"
  },
  textarea: {
    width: "100%",
    minHeight: "120px",
    padding: "12px 14px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
    background: "#fff",
    resize: "vertical"
  },
  smallText: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "20px"
  },
  buttonRow: {
    marginTop: "25px",
    display: "flex",
    gap: "15px"
  },
  primaryBtn: {
    flex: 1,
    padding: "14px",
    background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  secondaryBtn: {
    flex: 1,
    padding: "14px",
    background: "#ffffff",
    color: "#312e81",
    border: "2px solid #e0e7ff",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.2s, border 0.2s"
  }
};