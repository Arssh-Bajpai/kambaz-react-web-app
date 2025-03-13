import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import KambazNavigation from "./Kambaz/Navigation";
import Dashboard from "./Kambaz/Dashboard";
import Account from "./Kambaz/Account";
import Courses from "./Kambaz/Courses";
import Labs from "./Labs"; // Labs Homepage
import store from "./Kambaz/store";
import { Provider } from "react-redux";

export default function App() {
  return (
    <Router>
        <Provider store={store}>
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

            {/* Updated Courses Route with `:cid` */}
            <Route path="/Kambaz/Courses/:cid/*" element={<Courses courses={[]} />} />
          </Routes>
        </div>
      </div>
      </Provider>
    </Router>
  );
}
