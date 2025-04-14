import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();

  const links = currentUser
    ? [{ name: "Profile", path: "/Kambaz/Account/Profile" }]
    : [
        { name: "Signin", path: "/Kambaz/Account/Signin" },
        { name: "Signup", path: "/Kambaz/Account/Signup" },
      ];

  return (
    <nav className="list-group">
      {links.map((link) => (
        <Link
          key={link.name}
          to={link.path}
          className={`list-group-item list-group-item-action ${
            pathname === link.path ? "active" : ""
          }`}
        >
          {link.name}
        </Link>
      ))}
    </nav>
  );
}