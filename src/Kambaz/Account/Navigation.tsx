// src/Kambaz/Account/Navigation.tsx
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  // Get the current user from Redux
  const currentUser = useSelector((state: any) => state.account.currentUser);

  // Get the current URL path to highlight active links if desired
  const { pathname } = useLocation();

  return (
    <ul className="wd-account-menu">
      {/* If there's no current user, show Signin and Signup links */}
      {!currentUser && (
        <>
          <li>
            <Link
              to="/Kambaz/Account/Signin"
              className={`wd-account-link ${
                pathname === "/Kambaz/Account/Signin" ? "active" : ""
              }`}
            >
              Signin
            </Link>
          </li>
          <li>
            <Link
              to="/Kambaz/Account/Signup"
              className={`wd-account-link ${
                pathname === "/Kambaz/Account/Signup" ? "active" : ""
              }`}
            >
              Signup
            </Link>
          </li>
        </>
      )}

      {/* If there is a current user, show Profile link */}
      {currentUser && (
        <li>
          <Link
            to="/Kambaz/Account/Profile"
            className={`wd-account-link ${
              pathname === "/Kambaz/Account/Profile" ? "active" : ""
            }`}
          >
            Profile
          </Link>
        </li>
      )}
    </ul>
  );
}
