import { Routes, Route, Navigate } from "react-router-dom";
import Profile from "./Profile";
import Signin from "./Signin";
import Signup from "./Signup";
import { useSelector } from "react-redux";
export default function Account() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  return (
    <div 
      id="wd-account-screen" 
      className="d-flex vh-100"
      style={{ display: "flex", height: "100vh" }}
    >

      {/* Right Side (Content - Routes) */}
      <div 
        className="flex-grow-1 d-flex align-items-center justify-content-start"
        style={{ padding: "0 5%" }}
      >
        <Routes>
        <Route path="/" element={<Navigate to={ currentUser ? "/Kambaz/Account/Profile" : "/Kambaz/Account/Signin" }/>}/>
          <Route path="/Signin" element={<Signin />} />
          <Route path="/Profile" element={<Profile />} />
          <Route path="/Signup" element={<Signup />} />
        </Routes>
      </div>
    </div>
  );
}
