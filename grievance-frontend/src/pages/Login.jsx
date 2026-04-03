import { useState } from "react";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Modal from "../components/Modal";

export default function Login() {
  const navigate = useNavigate();

  const [data, setData] = useState({
    username: "",
    password: "",
    newPassword: "",
    organizationId: ""
  });
  const [loading, setLoading] = useState(false);
  const [modal, setModal] = useState({ isOpen: false, title: "", message: "", type: "info" });
  const [isChangePasswordMode, setIsChangePasswordMode] = useState(false);

  const handleLogin = async () => {
    if (!data.username || !data.password || !data.organizationId) {
      setModal({
        isOpen: true,
        title: "Missing Fields",
        message: "Please fill all fields",
        type: "error"
      });
      return;
    }

    setLoading(true);
    try {
      const res = await API.post("/user/login", data);
      const user = res.data;

      localStorage.setItem("user", JSON.stringify(user));

      if (user.role === "ADMIN") {
        navigate("/admin");
      } else if (user.role === "STAFF") {
        navigate("/assignee-dashboard");
      } else {
        navigate("/dashboard");
      }

    } catch (err) {
      console.error(err);
      setModal({
        isOpen: true,
        title: "Login Failed",
        message: "Invalid credentials or organization ID",
        type: "error"
      });
    } finally {
      setLoading(false);
    }
  };

  const handleChangePassword = async () => {
    if (!data.username || !data.password || !data.newPassword || !data.organizationId) {
      setModal({ isOpen: true, title: "Missing Fields", message: "Please fill all fields", type: "error" });
      return;
    }
    setLoading(true);
    try {
      await API.post("/user/change-password", {
        username: data.username,
        oldPassword: data.password,
        newPassword: data.newPassword,
        organizationId: data.organizationId
      });
      setModal({ isOpen: true, title: "Success", message: "Password updated successfully!", type: "success" });
      setIsChangePasswordMode(false);
      setData({ ...data, password: "", newPassword: "" });
    } catch (err) {
      setModal({ isOpen: true, title: "Error", message: err.response?.data || "Failed to update password", type: "error" });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={styles.container}>

      <div 
        style={styles.backButton} 
        onClick={() => navigate("/")}
      >
        ← Back to Home
      </div>

      <div style={styles.card}>
        <h2 style={styles.title}>
          {isChangePasswordMode ? "Change Password" : "Welcome Back"}
        </h2>

        <p style={styles.subtitle}>
          {isChangePasswordMode ? "Update your credentials securely" : "Sign in to your organization"}
        </p>

        {!isChangePasswordMode && (
          <div style={styles.helperBox}>
            <p>
              Login using the credentials provided during registration.
              <br />
              <strong>Admin</strong> → Manage system, assign staff  
              <br />
              <strong>Staff</strong> → Handle assigned grievances  
              <br />
              <strong>User</strong> → Submit and track complaints
            </p>
          </div>
        )}

        <input
          style={styles.input}
          placeholder="Username"
          value={data.username}
          onChange={(e) =>
            setData({ ...data, username: e.target.value })
          }
        />

        <input
          style={styles.input}
          type="password"
          placeholder={isChangePasswordMode ? "Current Password" : "Password"}
          value={data.password}
          onChange={(e) =>
            setData({ ...data, password: e.target.value })
          }
        />

        {isChangePasswordMode && (
          <input
            style={styles.input}
            type="password"
            placeholder="New Password"
            value={data.newPassword}
            onChange={(e) =>
              setData({ ...data, newPassword: e.target.value })
            }
          />
        )}

        <input
          style={styles.input}
          placeholder="Organization ID"
          value={data.organizationId}
          onChange={(e) =>
            setData({ ...data, organizationId: e.target.value })
          }
        />

        <button 
          style={styles.button} 
          onClick={isChangePasswordMode ? handleChangePassword : handleLogin} 
          disabled={loading}
        >
          {loading ? "Processing..." : (isChangePasswordMode ? "Update Password" : "Login")}
        </button>

        <button 
          style={{...styles.secondaryBtn, border: "none", background: "transparent", color: "#4f46e5", fontSize: "14px", marginTop: "15px"}} 
          onClick={() => setIsChangePasswordMode(!isChangePasswordMode)}
        >
          {isChangePasswordMode ? "Back to Login" : "Forgot / Change Password?"}
        </button>

      </div>

      <Modal
        isOpen={modal.isOpen}
        title={modal.title}
        message={modal.message}
        type={modal.type}
        onClose={() => setModal({ ...modal, isOpen: false })}
      />
    </div>
  );
}

const styles = {
  container: {
    minHeight: "100vh",
    fontFamily: "'Inter', sans-serif",
    background: "linear-gradient(135deg, #f8fafc 0%, #e2e8f0 100%)",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    padding: "20px"
  },
  backButton: {
    cursor: "pointer",
    color: "#4f46e5",
    fontWeight: "600",
    marginBottom: "20px",
    alignSelf: "flex-start",
    marginLeft: "max(calc(50vw - 200px), 20px)",
    fontSize: "15px",
    transition: "color 0.2s"
  },
  card: {
    width: "400px",
    background: "rgba(255, 255, 255, 0.85)",
    backdropFilter: "blur(12px)",
    padding: "40px",
    borderRadius: "20px",
    boxShadow: "0 20px 40px -10px rgba(0,0,0,0.1)",
    border: "1px solid rgba(255, 255, 255, 0.6)",
    textAlign: "center"
  },
  title: {
    marginBottom: "8px",
    fontSize: "26px",
    fontWeight: "700",
    color: "#0f172a"
  },
  subtitle: {
    fontSize: "15px",
    color: "#475569",
    marginBottom: "20px"
  },
  helperBox: {
    background: "rgba(241, 245, 249, 0.8)",
    border: "1px solid rgba(226, 232, 240, 0.8)",
    padding: "16px",
    borderRadius: "12px",
    fontSize: "14px",
    color: "#334155",
    marginBottom: "20px",
    lineHeight: "1.6",
    textAlign: "left"
  },
  input: {
    width: "100%",
    padding: "12px 14px",
    marginBottom: "16px",
    borderRadius: "10px",
    border: "1px solid #cbd5e1",
    fontSize: "15px",
    outline: "none",
    transition: "border 0.2s, box-shadow 0.2s",
    background: "#fff"
  },
  hintText: {
    fontSize: "13px",
    color: "#64748b",
    marginBottom: "12px",
    textAlign: "left",
    lineHeight: "1.4"
  },
  button: {
    width: "100%",
    padding: "14px",
    background: "linear-gradient(135deg, #4f46e5 0%, #3730a3 100%)",
    color: "#fff",
    border: "none",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    boxShadow: "0 10px 15px -3px rgba(79, 70, 229, 0.3)",
    transition: "transform 0.2s, box-shadow 0.2s"
  },
  secondaryBtn: {
    width: "100%",
    padding: "14px",
    marginTop: "12px",
    background: "#ffffff",
    color: "#312e81",
    border: "2px solid #e0e7ff",
    borderRadius: "10px",
    fontWeight: "700",
    fontSize: "16px",
    cursor: "pointer",
    transition: "background 0.2s, border 0.2s"
  }
};