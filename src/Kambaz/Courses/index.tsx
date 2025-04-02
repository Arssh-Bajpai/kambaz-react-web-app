// src/Kambaz/Courses/index.tsx
import { Routes, Route, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Dashboard from "../Dashboard";
import "../styles.css";

export default function Courses() {
  useParams();

  return (
    <div id="wd-courses" className="d-flex">
      <div className="wd-sidebar">
        <CourseNavigation />
      </div>
      <div className="wd-main-content">
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Dashboard" element={<Dashboard />} />
          {/* Add other nested routes as needed */}
        </Routes>
      </div>
    </div>
  );
}
