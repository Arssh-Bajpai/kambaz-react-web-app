import "../styles.css";
import { Link, useLocation, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { pathname } = useLocation();
  const { cid } = useParams();

  const links = [
    "Home",
    "Modules",
    "Piazza",
    "Zoom",
    "Assignments",
    "Quizzes",
    "Grades",
    "People",
  ];

  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      {links.map((link) => {
        const linkPath = `/Kambaz/Courses/${cid}/${link}`;
        const isActive = pathname.startsWith(linkPath);

        return (
          <Link
            key={link}
            to={linkPath}
            className={`list-group-item border-0 ${
              isActive ? "active text-white bg-danger" : "text-danger"
            }`}
          >
            {link}
          </Link>
        );
      })}
    </div>
  );
}