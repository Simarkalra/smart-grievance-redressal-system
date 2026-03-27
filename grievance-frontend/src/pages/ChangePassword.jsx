import { useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import Modal from "../components/Modal";

function ChangePassword() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const [modal, setModal] = useState({
    isOpen: false,
    title: "",
    message: "",
    type: "info"
  });

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
    <div style={styles.container}>

      <div style={styles.card}>
        <h2 style={styles.title}>Change Password</h2>
        <p style={styles.subtitle}>
          Update your account credentials securely
        </p>

        <form onSubmit={handleSubmit}>

          <input
            style={styles.input}
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />

          <input
            style={styles.input}
            type="password"
            placeholder="New Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <button type="submit" style={styles.primaryBtn}>
            Update Password
          </button>

          <button
            type="button"
            onClick={() => navigate("/dashboard")}
            style={styles.secondaryBtn}
          >
            Cancel
          </button>

        </form>
      </div>

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

const styles = {
  container: {
    minHeight: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(to right, #eef2f7, #f8fafc)",
    padding: "20px"
  },

  card: {
    width: "360px",
    background: "#fff",
    padding: "30px",
    borderRadius: "14px",
    boxShadow: "0 6px 16px rgba(0,0,0,0.08)",
    border: "1px solid #e5e7eb",
    textAlign: "center"
  },

  title: {
    fontSize: "22px",
    fontWeight: "600",
    marginBottom: "6px"
  },

  subtitle: {
    fontSize: "14px",
    color: "#6b7280",
    marginBottom: "20px"
  },

  input: {
    width: "100%",
    padding: "10px",
    marginBottom: "15px",
    borderRadius: "8px",
    border: "1px solid #d1d5db",
    fontSize: "14px"
  },

  primaryBtn: {
    width: "100%",
    padding: "12px",
    background: "#2563eb",
    color: "#fff",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer",
    marginBottom: "10px"
  },

  secondaryBtn: {
    width: "100%",
    padding: "10px",
    background: "#e5e7eb",
    border: "none",
    borderRadius: "8px",
    fontWeight: "600",
    cursor: "pointer"
  }
};