import { useState } from "react";
import API from "../api/api";

export default function AdminPanel() {

  const [category, setCategory] = useState("");

  const createCategory = async () => {
    await API.post("/admin/categories", {
      name: category
    });

    alert("Category created");
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Admin Panel</h2>

      <h3>Create Category</h3>

      <input
        placeholder="Category name"
        onChange={(e) => setCategory(e.target.value)}
      />

      <button onClick={createCategory}>Add</button>

    </div>
  );
}