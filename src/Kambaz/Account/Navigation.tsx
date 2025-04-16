import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  const active = (path: string) => (pathname.includes(path) ? "active" : "");

  return (
    <div id="wd-account-navigation" className="list-group">
      {currentUser ? (
        <Link
          to="/Kambaz/Account/Profile"
          className={`list-group-item ${active("Profile")}`}
        >
          Profile
        </Link>
      ) : (
        <>
          <Link
            to="/Kambaz/Account/Signin"
            className={`list-group-item ${active("Signin")}`}
          >
            Signin
          </Link>
          <Link
            to="/Kambaz/Account/Signup"
            className={`list-group-item ${active("Signup")}`}
          >
            Signup
          </Link>
        </>
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to="/Kambaz/Account/Users"
          className={`list-group-item ${active("Users")}`}
        >
          Users
        </Link>
      )}
    </div>
  );
}
