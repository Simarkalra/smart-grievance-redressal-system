import { useState } from "react";
import axios from "axios";

function ChangePassword() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post(
        "http://localhost:8080/user/change-password",
        {
          username,
          password,
        }
      );

      alert(res.data); // success message
    } catch (err) {
      console.log(err);
      alert("Error changing password");
    }
  };

  return (
    <div>
      <h2>Change Password</h2>

      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">Update Password</button>
      </form>
    </div>
  );
}

export default ChangePassword;