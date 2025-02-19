import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import KambazNavigation from "./Kambaz/Navigation";
import Dashboard from "./Kambaz/Dashboard";
import Account from "./Kambaz/Account";
import Courses from "./Kambaz/Courses";
import Labs from "./Labs"; // Labs Homepage
import Home from "./Kambaz/Courses/Home";
import Modules from "./Kambaz/Courses/Modules";
import Assignments from "./Kambaz/Courses/Assignments";
// import People from "./Kambaz/Courses/People";

export default function App() {
  return (
    <Router>
      <div className="d-flex">
        {/* Sidebar Navigation */}
        <KambazNavigation />

        {/* Main Content */}
        <div className="wd-main-content" style={{ marginLeft: "220px", padding: "20px", flex: 1 }}>
          <Routes>
            {/* Default Route - Load Dashboard First */}
            <Route path="/" element={<Navigate to="/Kambaz/Dashboard" replace />} />

            {/* Top-level Routes */}
            <Route path="/Kambaz/Dashboard" element={<Dashboard />} />
            <Route path="/Kambaz/Account/*" element={<Account />} />
            <Route path="/Labs/*" element={<Labs />} />

            {/* Nested Course Routes */}
            <Route path="/Kambaz/Courses/*" element={<Courses />}>
              <Route path="Home" element={<Home />} />
              <Route path="Modules" element={<Modules />} />
              <Route path="Assignments" element={<Assignments />} />
              {/* <Route path="People" element={<People />} /> */}
            </Route>
          </Routes>
        </div>
      </div>
    </Router>
  );
}
