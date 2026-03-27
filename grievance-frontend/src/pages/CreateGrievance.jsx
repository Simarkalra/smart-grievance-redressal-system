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

  const defaultCategories = [
    { id: "wifi", name: "WiFi Issue" },
    { id: "electricity", name: "Electricity Issue" },
    { id: "security", name: "Security Issue" }
  ];

  const [categories, setCategories] = useState(defaultCategories);
  const [selectedCategory, setSelectedCategory] = useState("");
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });

  useEffect(() => {
    API.get("/admin/categories")
      .then((res) => {
        if (Array.isArray(res.data) && res.data.length > 0) {
          setCategories(res.data);
        } else {
          setCategories(defaultCategories);
        }
      })
      .catch((err) => {
        console.warn("Category API failed, using default categories", err);
        setCategories(defaultCategories);
      });
  }, []);

  const submit = async () => {
    try {
      const user = JSON.parse(localStorage.getItem("user"));

      const payload = {
        description: data.description,
        user: { id: user.id }
      };

      if (selectedCategory === "other") {
        payload.title = data.title;
      } else {
        payload.category = { id: selectedCategory };
      }

      await API.post("/grievance/create", payload);

      setModal({
        isOpen: true,
        title: "Success!",
        message: "Grievance submitted successfully!",
        type: "success"
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      console.error("Submission error", err);
      setModal({
        isOpen: true,
        title: "Error",
        message: "Error submitting grievance. Please try again.",
        type: "error"
      });
    }
  };

  const isOther = selectedCategory === "other";
  const isSubmitDisabled =
    (!isOther && (!selectedCategory || !data.description.trim())) ||
    (isOther && (!data.title.trim() || !data.description.trim()));

  return (
    <div style={{ padding: 20 }}>
      <h2>Create Grievance</h2>

      <select
        value={selectedCategory}
        onChange={(e) => {
          setSelectedCategory(e.target.value);
          if (e.target.value !== "other") {
            setData((prev) => ({ ...prev, title: "" }));
          }
        }}
      >
        <option value="">Select Category</option>

        {categories.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}

        <option value="other">Other</option>
      </select>

      <br />
      <br />

      {isOther && (
        <>
          <input
            placeholder="Title"
            value={data.title}
            onChange={(e) => setData({ ...data, title: e.target.value })}
          />
          <br />
          <br />
        </>
      )}

      <textarea
        placeholder="Description"
        value={data.description}
        onChange={(e) => setData({ ...data, description: e.target.value })}
      />

      <br />
      <br />

      <button onClick={submit} disabled={isSubmitDisabled}>
        Submit
      </button>
      <button onClick={() => navigate("/dashboard")} style={{ marginLeft: 10 }}>
        Cancel
      </button>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => {
          setModal({ ...modal, isOpen: false });
          if (modal.type === "success") {
            navigate("/dashboard");
          }
        }}
      />
    </div>
  );
}