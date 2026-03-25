import { useNavigate } from "react-router-dom";

export default function SelectRole() {

  const navigate = useNavigate();

  return (
    <div style={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      height: "100vh",
      background: "#f5f5f5"
    }}>
      <div style={{
        background: "white",
        padding: 30,
        borderRadius: 10,
        textAlign: "center",
        boxShadow: "0 0 10px rgba(0,0,0,0.1)"
      }}>
        <h2>Select Login Type</h2>

        <br />

        <button onClick={() => navigate("/login/user")} style={btn}>
          Login as User
        </button>

        <br /><br />

        <button onClick={() => navigate("/login/admin")} style={btn}>
          Login as Admin
        </button>

        <br /><br />

        <button onClick={() => navigate("/login/assignee")} style={btn}>
          Login as Assignee
        </button>

      </div>
    </div>
  );
}

const btn = {
  padding: 10,
  width: 200,
  background: "#007bff",
  color: "white",
  border: "none",
  borderRadius: 5
};