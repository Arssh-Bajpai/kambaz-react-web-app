import { Routes, Route, Navigate, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import PeopleTable from "./People/Table";
import "../styles.css"; // Adjust path to ensure it resolves correctly


export default function Courses() {
  const { cid } = useParams(); // Get course ID from URL

  return (
    <div id="wd-courses" className="d-flex wd-course-container">
      {/* Sidebar */}
      <div className="d-none d-md-block">
        <CourseNavigation />
      </div>

      {/* Main Content */}
      <div className="flex-fill wd-main-content">
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="People" element={<PeopleTable />} />
        </Routes>
      </div>
    </div>
  );
}
