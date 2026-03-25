import { Link } from "react-router-dom";

export default function Dashboard() {
  return (
    <div style={{ padding: 20 }}>
      <h1>Dashboard</h1>

      <div style={{ display: "flex", gap: 20 }}>

        <a href="/create" style={card}>Create Grievance</a>
        <a href="/my" style={card}>My Grievances</a>
       

      </div>
    </div>
  );
}

const card = {
  padding: 20,
  background: "#007bff",
  color: "white",
  borderRadius: 10,
  textDecoration: "none"
};