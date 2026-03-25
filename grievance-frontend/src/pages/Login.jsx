import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Login() {

  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
    organizationId: ""
  });

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        "http://localhost:8080/user/login",
        data
      );

      localStorage.setItem("user", JSON.stringify(res.data));

      if (res.data.role === "ADMIN") navigate("/admin");
      else if (res.data.role === "STAFF") navigate("/staff");
      else navigate("/dashboard");

    } catch {
      alert("Login failed");
    }
  };

  return (
    <div className="container">

      <div className="card">
        <h2>Login</h2>

        <input
          placeholder="Username"
          onChange={(e) => setData({ ...data, username: e.target.value })}
        />

        <input
          type="password"
          placeholder="Password"
          onChange={(e) => setData({ ...data, password: e.target.value })}
        />

        <input
          placeholder="Organization ID"
          onChange={(e) => setData({ ...data, organizationId: e.target.value })}
        />

        <button onClick={handleLogin}>Login</button>
      </div>

    </div>
  );
}