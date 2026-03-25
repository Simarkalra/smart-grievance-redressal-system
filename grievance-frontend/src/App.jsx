import { BrowserRouter, Routes, Route } from "react-router-dom";

import Home from "./pages/Home"; // 🔥 NEW
import CreateSystem from "./pages/CreateSystem"; // 🔥 NEW
import JoinSystem from "./pages/JoinSystem"; // 🔥 NEW

import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import CreateGrievance from "./pages/CreateGrievance";
import MyGrievances from "./pages/MyGrievances";
import AdminPanel from "./pages/AdminPanel";
import SelectRole from "./pages/SelectRole";
import Login from "./pages/Login";
import AssigneeDashboard from "./pages/AssigneeDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import ChangePassword from "./pages/ChangePassword";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* 🔥 NEW MAIN ENTRY */}
        <Route path="/" element={<Home />} />

        {/* 🔥 ORG SYSTEM */}
        <Route path="/create-system" element={<CreateSystem />} />
        <Route path="/join-system" element={<JoinSystem />} />

        {/* 🔐 LOGIN FLOW */}
        <Route path="/login" element={<Login />} />

        {/* OPTIONAL: OLD ROLE SELECT (can remove later) */}
        {/* <Route path="/login" element={<SelectRole />} /> */}

        {/* 🔑 CHANGE PASSWORD */}
        <Route path="/change-password" element={<ChangePassword />} />

        {/* 🧑 USER DASHBOARD */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute allowedRole="USER">
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* 👨‍💼 ADMIN PANEL */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute allowedRole="ADMIN">
              <AdminPanel />
            </ProtectedRoute>
          }
        />

        {/* 👷 STAFF / ASSIGNEE */}
        <Route
          path="/staff"
          element={
            <ProtectedRoute allowedRole="STAFF">
              <AssigneeDashboard />
            </ProtectedRoute>
          }
        />

        {/* 📄 GRIEVANCE */}
        <Route path="/create" element={<CreateGrievance />} />
        <Route path="/my" element={<MyGrievances />} />

      </Routes>
    </BrowserRouter>
  );
}

export default App;