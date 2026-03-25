import { useEffect, useState } from "react";
import API from "../api/api";

export default function AssigneeDashboard() {

  const [data, setData] = useState([]);

  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("user"));

    API.get(`/grievances/assignee/${user.id}`)
      .then((res) => setData(res.data))
      .catch((err) => console.log(err));
  }, []);

  const resolve = async (id) => {
    await API.put(`/grievances/${id}/resolve`);
    alert("Resolved");

    window.location.reload();
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Assigned Grievances</h2>

      {data.map((g) => (
        <div key={g.id} style={{
          border: "1px solid #ccc",
          padding: 15,
          marginBottom: 10,
          borderRadius: 10
        }}>
          <h3>{g.title}</h3>
          <p>{g.description}</p>

          <p><b>Priority:</b> {g.priority}</p>
          <p><b>Status:</b> {g.status}</p>
          <p><b>Deadline:</b> {g.resolutionDeadline}</p>

          {g.status !== "RESOLVED" && (
            <button onClick={() => resolve(g.id)}>
              Mark as Resolved
            </button>
          )}
        </div>
      ))}
    </div>
  );
}