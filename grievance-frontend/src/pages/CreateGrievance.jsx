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

  // ✅ FIXED: No default categories
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("");

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

  // ✅ LOAD CATEGORIES (FIXED)
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    console.log("User:", user);

    if (!user || !user.organizationId) {
      console.warn("No organization found for user");
      return;
    }

    API.get(`/admin/categories?orgId=${user.organizationId}`)
      .then((res) => {
        console.log("Categories:", res.data);
        setCategories(res.data || []);
      })
      .catch((err) => {
        console.error("Failed to load categories", err);
        setCategories([]);
      });
  }, []);

  // ✅ SUBMIT GRIEVANCE
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
    <div style={{ padding: 20 }}>
      <h2>Create Grievance</h2>

      {/* CATEGORY */}
      <select
        value={selectedCategory}
        onChange={(e) => setSelectedCategory(e.target.value)}
      >
        <option value="">Select Category</option>

        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>

      <br /><br />

      {/* DESCRIPTION */}
      <textarea
        placeholder="Description"
        value={data.description}
        onChange={(e) =>
          setData({ ...data, description: e.target.value })
        }
      />

      <br /><br />

      {/* BUTTONS */}
      <button onClick={submit}>
        Submit
      </button>

      <button
        onClick={() => navigate("/dashboard")}
        style={{ marginLeft: 10 }}
      >
        Cancel
      </button>

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