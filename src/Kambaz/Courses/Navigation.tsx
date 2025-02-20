import { NavLink, useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import coursesData from "../Database/courses.json"; // Import courses from JSON

// Define the structure of a course object based on `courses.json`
interface CourseData {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
}

export default function CourseNavigation() {
  const { cid } = useParams<{ cid: string }>(); // Get course ID from URL
  const [courseName, setCourseName] = useState<string>("Loading...");

  useEffect(() => {
    // Ensure that coursesData is an array and find the course by ID
    if (Array.isArray(coursesData)) {
      const selectedCourse = coursesData.find((course: CourseData) => course._id === cid);
      setCourseName(selectedCourse ? selectedCourse.name : "Course Not Found");
    } else {
      setCourseName("Error Loading Courses");
    }
  }, [cid]); // Re-run effect when `cid` changes

  const [leftPosition, setLeftPosition] = useState<number>(150);

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
      style={{
        position: "fixed",
        left: `${leftPosition}px`,
        top: "0px",
        width: "220px",
        height: "100vh",
        backgroundColor: "#f8f9fa",
        overflowY: "auto",
      }}
    >
      {/* Course Name at the Top */}
      <div className="p-3 fw-bold text-center bg-dark text-white">
        {courseName}
      </div>

      {/* Navigation Links */}
      <NavLink
        to={`/Kambaz/Courses/${cid}/Home`}
        className={({ isActive }) =>
          `list-group-item list-group-item-action border border-0 ${isActive ? "active-link" : ""}`
        }
      >
        Home
      </NavLink>

      <NavLink
        to={`/Kambaz/Courses/${cid}/Modules`}
        className={({ isActive }) =>
          `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`
        }
      >
        Modules
      </NavLink>

      <NavLink
        to={`/Kambaz/Courses/${cid}/Piazza`}
        className={({ isActive }) =>
          `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`
        }
      >
        Piazza
      </NavLink>

      <NavLink
        to={`/Kambaz/Courses/${cid}/Zoom`}
        className={({ isActive }) =>
          `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`
        }
      >
        Zoom
      </NavLink>

      <NavLink
        to={`/Kambaz/Courses/${cid}/Assignments`}
        className={({ isActive }) =>
          `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`
        }
      >
        Assignments
      </NavLink>

      <NavLink
        to={`/Kambaz/Courses/${cid}/Quizzes`}
        className={({ isActive }) =>
          `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`
        }
      >
        Quizzes
      </NavLink>

      <NavLink
        to={`/Kambaz/Courses/${cid}/People`}
        className={({ isActive }) =>
          `list-group-item list-group-item-action border border-0 ${isActive ? "active-link text-primary" : "text-danger"}`
        }
      >
        People
      </NavLink>
    </div>
  );
}
