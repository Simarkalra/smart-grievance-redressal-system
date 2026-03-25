import { useEffect, useState } from "react";
import axios from "axios";

export default function CreateGrievance() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  // ✅ Fetch categories from backend
  useEffect(() => {
    axios
      .get("http://localhost:8080/categories") // change if needed
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load categories");
      });
  }, []);

  // ✅ Handle Submit
  const handleSubmit = async () => {
    try {
      let payload;

      if (selected === "Other") {
        payload = {
          customTitle: title,
          description,
        };
      } else {
        payload = {
          category: { id: selected },
          description,
        };
      }

      await axios.post(
        "http://localhost:8080/grievance/create",
        payload
      );

      setMessage("Grievance submitted successfully!");

      // reset form
      setSelected("");
      setTitle("");
      setDescription("");

    } catch (err) {
      console.error(err);
      alert("Error submitting grievance");
    }
  };

  // ✅ Validation
  const isValid =
    selected === "Other"
      ? title.trim() && description.trim()
      : selected && description.trim();

  return (
    <div className="container">
      <div className="card">
        <h2>Create Grievance</h2>

        {/* 🔽 Category Dropdown */}
        <select
          value={selected}
          onChange={(e) => {
            setSelected(e.target.value);
            if (e.target.value !== "Other") {
              setTitle("");
            }
            setDescription("");
          }}
        >
          <option value="">Select Issue</option>

          {/* Dynamic categories */}
        {categories.map((cat) => (
  <option key={cat.id} value={cat.id}>
    {cat.name}
  </option>
))}
          {/* Other option */}
          <option value="Other">Other</option>
        </select>

        {/* 📝 Description box - always shown */}
        <textarea
          placeholder="Describe your issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {/* 📝 Other → title */}
        {selected === "Other" && (
          <input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}

        {/* 🚀 Submit */}
        <button disabled={!isValid} onClick={handleSubmit}>
          Submit
        </button>

        {/* ✅ Success Message */}
        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>
    </div>
  );
}