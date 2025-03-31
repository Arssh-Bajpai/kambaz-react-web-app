import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import Modules from "./Modules"; 
import "./styles.css";
import Account from "./Account";
import KambazNavigation from "./Navigation"; // Sidebar

export default function Kambaz() {
  return (
    <div id="wd-kambaz">
      <table>
        <tbody>
          <tr>
            <td valign="top">
              <KambazNavigation />
            </td>
            <td valign="top">
              <Routes>
                <Route path="/" element={<Navigate to="/Account" />} />
                <Route path="/Account/*" element={<Account />} />
                <Route path="/Dashboard" element={<Dashboard />} />
                {/* Courses route can load its own nested routes */}
                <Route path="/Courses/:cid/*" element={<Courses />} />
                {/* Dedicated Modules route under a specific course */}
                <Route path="/Courses/:cid/Modules" element={<Modules />} />
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
