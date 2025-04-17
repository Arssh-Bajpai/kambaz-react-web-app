import { Link, useLocation, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import "../styles.css";

export default function AccountNavigation() {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { pathname } = useLocation();
  const { cid } = useParams();

  const active = (path: string) => (pathname.includes(path) ? "active" : "");
  const links = [
    "Signin",
    "Signup",
    "Profile",
    "Users"
  ];

  // return (
  //   <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
  //     {links.map((link) => {
  //       const linkPath = `/Kambaz/Account/${cid}/${link}`;
  //       const isActive = pathname.startsWith(linkPath);

  //       return (
  //         <Link
  //           key={link}
  //           to='Kambaz/Account/Signin'
            // className={`list-group-item border-0 ${
            //   isActive ? "active text-white bg-danger" : "text-danger"
            // }`}
  //         >
  //           {link}
  //         </Link>
  //       );
  //     })}
  //   </div>
  // );
  return (
    
    <div id="wd-account-navigation" className="wd list-group fs-5 rounded-0">
     
      {currentUser ? (
        
        <Link
          to="/Kambaz/Account/Profile"
          className={`list-group-item border-0 ${
            active("Profile") === "active" ? "active text-white bg-danger" : "text-danger"
          }`}
          
        >
          Profile
        </Link>
      ) : (
        <>
          <Link
            to="/Kambaz/Account/Signin"
            className={`list-group-item border-0 ${
              active("Signin") === "active" ? "active text-white bg-danger" : "text-danger"
            }`}
          >
            Signin
          </Link>
          <Link
            to="/Kambaz/Account/Signup"
            className={`list-group-item border-0 ${
              active("Signup") === "active" ? "active text-white bg-danger" : "text-danger"
            }`}
          >
            Signup
          </Link>
        </>
        
      )}

      {currentUser && currentUser.role === "ADMIN" && (
        <Link
          to="/Kambaz/Account/Users"
          className={`list-group-item border-0 ${
            active("Users") === "active" ? "active text-white bg-danger" : "text-danger"
          }`}
        >
          Users
        </Link>
      )}
    </div>
  );
}
