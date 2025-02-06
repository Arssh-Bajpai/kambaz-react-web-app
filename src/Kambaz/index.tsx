import { Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Account from "./Account";
import KambazNavigation from "./Navigation"; // Sidebar

export default function Kambaz() {
  return (
    <div className="d-flex">
      {/* ✅ Sidebar */}
      <div className="d-none d-md-block bg-black text-white p-3">
        <KambazNavigation />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-fill p-3">
        <Routes>
          <Route path="Account" element={<Account />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Courses/*" element={<Courses />} />
        </Routes>
      </div>
    </div>
  );
}
