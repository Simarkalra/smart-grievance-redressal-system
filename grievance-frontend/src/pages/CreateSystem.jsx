import { useEffect, useState } from "react";
import API from "../api/api";

export default function CreateGrievance() {
  const [categories, setCategories] = useState([]);
  const [selected, setSelected] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    API.get("/categories")
      .then((res) => setCategories(res.data))
      .catch((err) => {
        console.error(err);
        alert("Failed to load categories");
      });
  }, []);

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

      await API.post("/grievance/create", payload);

      setMessage("Grievance submitted successfully!");

      setSelected("");
      setTitle("");
      setDescription("");

    } catch (err) {
      console.error(err);
      alert("Error submitting grievance");
    }
  };

  const isValid =
    selected === "Other"
      ? title.trim() && description.trim()
      : selected && description.trim();

  return (
    <div className="container">
      <div className="card">
        <h2>Create Grievance</h2>

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

          {categories.map((cat) => (
            <option key={cat.id} value={cat.id}>
              {cat.name}
            </option>
          ))}
          <option value="Other">Other</option>
        </select>

        <textarea
          placeholder="Describe your issue"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />

        {selected === "Other" && (
          <input
            placeholder="Enter Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        )}

        <button disabled={!isValid} onClick={handleSubmit}>
          Submit
        </button>

        {message && <p style={{ color: "green" }}>{message}</p>}
      </div>
    </div>
  );
}