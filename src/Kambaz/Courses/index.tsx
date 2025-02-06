import { Routes, Route, Navigate, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import "../styles.css"; // Ensure this exists

export default function Courses() {
  useParams(); // Get course ID from URL

  return (
    <div id="wd-courses" className="d-flex">
  {/* Main Content with Correct Padding */}
  <div className="wd-main-content">
    <Routes>
      <Route path="Home" element={<Home />} />
      <Route path="Modules" element={<Modules />} />
      <Route path="Assignments" element={<Assignments />} />
      <Route path="Assignments/:aid" element={<AssignmentEditor />} />
      <Route path="People" element={<PeopleTable />} />
    </Routes>
  </div>

  {/* Right Sidebar Navigation - Properly Positioned */}
  <div className="wd-course-navigation">
    <CourseNavigation />
  </div>
</div>


  );
}
