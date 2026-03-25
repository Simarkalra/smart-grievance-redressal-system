import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

export default function Register() {
const [data, setData] = useState({
  username: "",
  password: "",
  role: "USER"
});

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await API.post("/user/register", data);
      alert("Registered successfully!");
      navigate("/dashboard");
    } catch (err) {
      console.log(err);
      alert("Error registering");
    }
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Register</h2>

      <input
  placeholder="Username"
  onChange={(e) => setData({ ...data, username: e.target.value })}
/>

<input
  type="password"
  placeholder="Password"
  onChange={(e) => setData({ ...data, password: e.target.value })}
/>
      <button onClick={handleSubmit}>Register</button>
    </div>
  );
}