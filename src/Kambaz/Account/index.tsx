import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router";
import Signin from "./Signin";
import Signup from "./Signup";
import Profile from "./Profile";
import AccountNavigation from "./Navigation";

export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  return (
    <div id="wd-account-screen">
      <div className="account-container">
        <Sidebar />
        <MainContent currentUser={currentUser} />
      </div>
    </div>
  );
}

// Sidebar Component: Contains the AccountNavigation
const Sidebar = () => (
  <div className="sidebar">
    <AccountNavigation />
  </div>
);

// MainContent Component: Renders routes based on the currentUser
const MainContent = ({ currentUser }: { currentUser: any }) => (
  <div className="main-content">
    <Routes>
      <Route
        path="/"
        element={<Navigate to={currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin"} />}
      />
      <Route path="/Signin" element={<Signin />} />
      <Route path="/Signup" element={<Signup />} />
      <Route path="/Profile" element={<Profile />} />
    </Routes>
  </div>
);
