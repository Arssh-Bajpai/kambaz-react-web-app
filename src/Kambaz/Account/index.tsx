import AccountNavigation from "../Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";

export default function Account() {
  return (
    <div id="wd-account-screen" className="wd-account-container">
      <h2>Account</h2>
      
      {/* Layout Wrapper */}
      <div className="wd-account-layout">
        {/* Left Sidebar (Navigation) */}
        <div className="wd-account-sidebar">
          <AccountNavigation />
        </div>

        {/* Right Side (Content - Routes) */}
        <div className="wd-account-content">
          <Routes>
            <Route path="/" element={<Navigate to="/Kambaz/Account/Signin" />} />
            <Route path="/Signin" element={<Signin />} />
            <Route path="/Profile" element={<Profile />} />
            <Route path="/Signup" element={<Signup />} />
          </Routes>
        </div>
      </div>
    </div>
  );
} 