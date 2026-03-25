import { useEffect, useState } from "react";
import API from "../api/api";

export default function MyGrievances() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    API.get(`/grievances/user/${user.id}`)
      .then((res) => setData(res.data));
  }, []);

  return (
    <div style={{ padding: 20 }}>
      <h2>My Grievances</h2>

      {data.map((g) => (
        <div key={g.id} style={{ border: "1px solid black", margin: 10, padding: 10 }}>
          <h4>{g.title}</h4>
          <p>{g.description}</p>

          {/* 🔥 YOUR POWER FEATURES */}
          <p>Priority: {g.priority}</p>
          <p>Status: {g.status}</p>
          <p>Deadline: {g.resolutionDeadline}</p>
          <p>Assigned To: {g.assignee?.username}</p>
        </div>
      ))}
    </div>
  );
}