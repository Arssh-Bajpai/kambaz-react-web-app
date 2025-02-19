import { NavLink } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CourseNavigation() {
  const [leftPosition, setLeftPosition] = useState(150);

  useEffect(() => {
    const updateNavPosition = () => {
      setLeftPosition(window.innerWidth < 768 ? 20 : 150);
    };

    window.addEventListener("resize", updateNavPosition);
    updateNavPosition(); // Initial call

    return () => window.removeEventListener("resize", updateNavPosition);
  }, []);

  return (
    <div 
      id="wd-courses-navigation" 
      className="wd list-group fs-5 rounded-0"
      style={{ position: "fixed", left: `${leftPosition}px`, top: "0px", width: "200px" }} 
    >
      {/* Home */}
      <NavLink 
        to="/Kambaz/Courses/Home" 
        className={({ isActive }) => `list-group-item list-group-item-action border border-0 ${isActive ? "active-link" : ""}`}
      >
        Home
      </NavLink>

      {/* Modules */}
      <NavLink 
        to="/Kambaz/Courses/Home" 
        className={({ isActive }) => `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`}
      >
        Modules
      </NavLink>

      {/* Piazza */}
      <NavLink 
        to="/Kambaz/Courses/Piazza" 
        className={({ isActive }) => `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`}
      >
        Piazza
      </NavLink>

      {/* Zoom */}
      <NavLink 
        to="/Kambaz/Courses/Zoom" 
        className={({ isActive }) => `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`}
      >
        Zoom
      </NavLink>

      {/* Assignments */}
      <NavLink 
        to="/Kambaz/Courses/Assignments" 
        className={({ isActive }) => `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`}
      >
        Assignments
      </NavLink>

      {/* Quizzes */}
      <NavLink 
        to="/Kambaz/Courses/Quizzes" 
        className={({ isActive }) => `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`}
      >
        Quizzes
      </NavLink>

      {/* People */}
      <NavLink 
        to="/Kambaz/Courses/People" 
        className={({ isActive }) => `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`}
      >
        People
      </NavLink>
    </div>
  );
}
