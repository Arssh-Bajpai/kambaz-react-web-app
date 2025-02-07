import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import KambazNavigation from "./Kambaz/Navigation";
import Dashboard from "./Kambaz/Dashboard";
import Account from "./Kambaz/Account";
import Courses from "./Kambaz/Courses";
import Labs from "./Labs";

export default function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar Navigation */}
        <KambazNavigation />

        {/* Main Content */}
        <div className="wd-main-content">
          <Routes>
            <Route path="/Kambaz/Account/*" element={<Account />} />
            <Route path="/Kambaz/Dashboard" element={<Dashboard />} />
            <Route path="/Kambaz/Courses/*" element={<Courses />} />
            <Route path="/Labs" element={<Labs />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}
