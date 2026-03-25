import { useState } from "react";
import API from "../api/api";

export default function JoinSystem() {

  const [data, setData] = useState({
    username: "",
    password: "",
    role: "USER",
    orgId: ""
  });

  const handleRegister = async () => {
    try {
      await API.post(
        `/user/register-with-org?orgId=${data.orgId}`,
        {
          username: data.username,
          password: data.password,
          role: data.role
        }
      );

      alert("Registered Successfully");

    } catch {
      alert("Error registering");
    }
  };

  return (
    <div className="container">

      <div className="card">
        <h2>Join System</h2>

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
          onChange={(e) => setData({ ...data, orgId: e.target.value })}
        />

        <select
          onChange={(e) => setData({ ...data, role: e.target.value })}
        >
          <option value="USER">User</option>
          <option value="STAFF">Staff</option>
        </select>

        <button onClick={handleRegister}>Register</button>
      </div>

    </div>
  );
}