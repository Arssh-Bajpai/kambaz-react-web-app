import { useState, useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";

export default function CourseNavigation() {
  const { cid } = useParams(); // Get course ID from URL

  // Define navigation links dynamically
  const links = ["Home", "Modules", "Piazza", "Zoom", "Assignments", "Quizzes", "Grades", "People"];

  const [leftPosition, setLeftPosition] = useState(220); // Adjusted position further right
  const [topPosition, setTopPosition] = useState(120); // Lowered sidebar

  useEffect(() => {
    const updateNavPosition = () => {
      setLeftPosition(window.innerWidth < 768 ? 60 : 220); // Adjust left dynamically
      setTopPosition(window.innerWidth < 768 ? 100 : 120); // Adjust top dynamically
    };

    window.addEventListener("resize", updateNavPosition);
    updateNavPosition(); // Initial positioning

    return () => window.removeEventListener("resize", updateNavPosition);
  }, []);

  return (
    <div 
      id="wd-courses-navigation"
      className="wd list-group fs-5 rounded-0"
      style={{ 
        position: "fixed", 
        left: `${leftPosition}px`, // Adjusted right
        top: `${topPosition}px`, // Lowered dynamically
        width: "230px",
        backgroundColor: "white",
        padding: "12px",
        borderRadius: "8px",
        boxShadow: "0px 4px 6px rgba(0, 0, 0, 0.15)",
        zIndex: 1000,
      }} 
    >
      {links.map((link) => {
        let linkPath;

        // Special case: Assignments should link to the Assignments page, not an editor
        if (link === "Assignments") {
          linkPath = `/Kambaz/Courses/${cid}/Assignments`;
        } else {
          linkPath = `/Kambaz/Courses/${cid}/${link}`;
        }

        return (
          <NavLink 
            key={link}
            to={linkPath} 
            className={({ isActive }) => `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-dark" : "text-danger"}`}
          >
            {link}
          </NavLink>
        );
      })}
    </div>
  );
}

