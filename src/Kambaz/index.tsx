// src/Kambaz/Courses/index.tsx
import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import CourseNavigation from "./Navigation";
import Home from "./Courses/Home";
import Modules from "./Courses/Modules";
import Dashboard from "./Dashboard";
import "../styles.css";
import Session from "./Account/Session";
import * as userClient from "./Account/client";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const { currentUser } = useSelector((state: any) => state.accountReducer);

  useEffect(() => {
    if (currentUser) {
      const fetchCourses = async () => {
        try {
          const coursesData = await userClient.findMyCourses(); // ✅ Fixed
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
          <div className="wd-sidebar">
            <CourseNavigation />
          </div>
          <div className="wd-main-content">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/modules" element={<Modules />} />
              <Route path="/dashboard" element={<Dashboard courses={courses} />} /> {/* ✅ Fixed */}
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </div>
        </div>
      </Router>
    </Session>
  );
}
