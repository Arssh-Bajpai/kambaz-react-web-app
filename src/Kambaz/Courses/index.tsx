import { Routes, Route, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import "../styles.css"; // Ensure styles exist

export default function Courses({ courses }: { courses: any[] }) {
  // Extract `cid` from URL
  const { cid } = useParams();

  // Find the course by ID
  const course = courses.find((course) => course._id === cid);

  return (
    <div id="wd-courses" className="d-flex">
      {/* Sidebar Navigation */}
      <div className="wd-sidebar">
        <h1 className="wd-course-title">{course?.name || "Course Not Found"}</h1>
        <CourseNavigation />
      </div>

      {/* Main Content */}
      <div className="wd-main-content">
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          <Route path="Assignments" element={<Assignments />} />
          <Route path="Assignments/:aid" element={<AssignmentEditor />} />
          <Route path="People" element={<PeopleTable />} />
        </Routes>
      </div>
    </div>
  );
}
