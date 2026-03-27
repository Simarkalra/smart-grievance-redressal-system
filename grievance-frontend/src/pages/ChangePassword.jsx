import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Modal from "../components/Modal";

function ChangePassword() {
  const navigate = useNavigate();
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await API.post("/user/change-password", {
        username,
        password,
      });

      setModal({
        isOpen: true,
        title: "Success!",
        message: res.data || "Password updated successfully!",
        type: "success"
      });

      setTimeout(() => {
        navigate("/dashboard");
      }, 2000);

    } catch (err) {
      console.log(err);
      setModal({
        isOpen: true,
        title: "Error",
        message: "Error changing password. Please try again.",
        type: "error"
      });
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
          required
        />

        <br /><br />

        <input
          type="password"
          placeholder="New Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <br /><br />

        <button type="submit">Update Password</button>
        <button type="button" onClick={() => navigate("/dashboard")} style={{ marginLeft: 10 }}>
          Cancel
        </button>
      </form>

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

export default ChangePassword;