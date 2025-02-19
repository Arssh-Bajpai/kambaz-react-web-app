import { Link, useLocation } from "react-router-dom";
import { AiOutlineDashboard } from "react-icons/ai";
import { IoCalendarOutline } from "react-icons/io5";
import { LiaBookSolid, LiaCogSolid } from "react-icons/lia";
import { FaInbox, FaRegCircleUser } from "react-icons/fa6";

export default function KambazNavigation() {
  const location = useLocation(); // Get current route for active link styling

  return (
    <div id="wd-kambaz-navigation" className="list-group rounded-0 position-fixed bottom-0 top-0 d-none d-md-block bg-black z-2">
      
      {/* Northeastern University Logo */}
      <a id="wd-neu-link" target="_blank" href="https://www.northeastern.edu/"
         className="list-group-item bg-black border-0 text-center text-white">
        <img src="/images/NEU.png" width="75px" alt="Northeastern University Logo" />
      </a>

      {/* Account */}
      <Link to="/Kambaz/Account"
            className={`list-group-item text-center border-0 bg-black text-white ${location.pathname === "/Kambaz/Account" ? "active-link" : ""}`}>
        <FaRegCircleUser className="fs-1" /><br />
        Account
      </Link>

      {/* Dashboard */}
      <Link to="/Kambaz/Dashboard"
            className={`list-group-item text-center border-0 ${location.pathname.startsWith("/Kambaz/Dashboard") ? "active-link" : "inactive-link"}`}>
        <AiOutlineDashboard className="fs-1" /><br />
        Dashboard
      </Link>

      {/* Courses (Fixed Route) */}
      <Link to="/Kambaz/Courses"
            className={`list-group-item text-center border-0 bg-black text-white ${location.pathname.startsWith("/Kambaz/Courses") ? "active-link" : ""}`}>
        <LiaBookSolid className="fs-1 text-danger" /><br />
        Courses
      </Link>

      {/* Calendar */}
      <Link to="/Kambaz/Calendar"
            className={`list-group-item text-center border-0 bg-black text-white ${location.pathname.startsWith("/Kambaz/Calendar") ? "active-link" : ""}`}>
        <IoCalendarOutline className="fs-1 text-danger" /><br />
        Calendar
      </Link>

      {/* Inbox */}
      <Link to="/Kambaz/Inbox"
            className={`list-group-item text-center border-0 bg-black text-white ${location.pathname.startsWith("/Kambaz/Inbox") ? "active-link" : ""}`}>
        <FaInbox className="fs-1 text-danger" /><br />
        Inbox
      </Link>

     {/* Labs - Navigates Directly to Lab 1 */}
<Link 
  to="/Labs/Lab1"  // Now goes directly to Lab1
  className={`list-group-item text-center border-0 bg-black text-white ${
    location.pathname.startsWith("/Labs") ? "active-link" : ""
  }`}
>
  <LiaCogSolid className="fs-1 text-danger" /><br />
  Labs
</Link>


    </div>
  );
}
