// src/Kambaz/Courses/index.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseNavigation from "./Navigation";
import Home from "./Courses/Home";
import Modules from "./Courses/Modules";
import Dashboard from "./Dashboard"; // Dashboard now accepts a courses prop.
import "../styles.css";
import Session from "./Account/Session";
import { findMyCourses } from "./Account/client";

export default function Kambaz() {
  // Local state for courses fetched from the server
  const [courses, setCourses] = useState<any[]>([]);
  
  // Access the current user from redux state
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  // Fetch courses only when there is a current user.
  useEffect(() => {
    if (currentUser) {
      const fetchCourses = async () => {
        try {
          const coursesData = await findMyCourses();
          setCourses(coursesData);
        } catch (error) {
          console.error("Error fetching courses:", error);
        }
      };
      fetchCourses();
    }
  }, [currentUser]);

  return (
    <Session>
      <Router>
        <div id="wd-courses" className="d-flex">
          {/* LEFT SIDEBAR */}
          <div className="wd-sidebar">
            <CourseNavigation />
          </div>
          {/* MAIN CONTENT AREA */}
          <div className="wd-main-content">
            <Routes>
              {/* Default Home route */}
              <Route path="/" element={<Home />} />
              <Route path="/modules" element={<Modules />} />
              {/* Pass courses as props to Dashboard */}
              <Route path="/dashboard" element={<Dashboard courses={courses} />} />
              {/* Fallback: Redirect unknown routes to Home */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Session>
  );
}
