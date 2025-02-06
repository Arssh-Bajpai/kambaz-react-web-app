import { Routes, Route, Navigate } from "react-router-dom";
import AccountNavigation from "../Navigation";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";

export default function Account() {
  return (
    <div id="wd-account-screen" className="wd-account-container">
      <h2>Account</h2>

      {/* Layout Wrapper */}
      <div className="wd-account-layout d-flex">
        {/* Left Sidebar (Navigation) */}
        <div className="wd-account-sidebar">
          <AccountNavigation />
        </div>

        {/* Right Side (Content - Routes) */}
        <div className="wd-account-content">
          <Routes>
            <Route path="/" element={<Navigate to="/Account/Signin" />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Signup" element={<Signup />} />
            <Route path="/Profile" element={<Profile />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
