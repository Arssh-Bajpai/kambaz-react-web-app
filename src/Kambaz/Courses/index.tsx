import { Routes, Route, useParams, useLocation } from "react-router-dom";
import coursesData from "../Database/courses.json"; // Import JSON file
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import { FaAlignJustify } from "react-icons/fa6";
import "../styles.css"; // Ensure styles exist

interface CourseData {
  _id: string;
  name: string;
}

export default function Courses() {
  const { cid } = useParams<{ cid: string }>(); // Extract course ID from URL
  const { pathname } = useLocation(); // Get current path

  // Debugging: Log URL and Courses.json Data
  console.log("🔍 URL Course ID (cid):", cid);
  console.log("📚 Available Courses:", coursesData.map(course => course._id));

  // Find matching course
  const selectedCourse = coursesData.find((course: CourseData) => {
    console.log(`Checking course ID: ${course._id} against URL ID: ${cid}`);
    return course._id === cid;
  });

  if (!selectedCourse) {
    console.warn(`⚠️ Course not found for ID: ${cid}`);
    return <div className="wd-main-content">Course not found</div>;
  }

  return (
    <div id="wd-courses" className="d-flex vh-100">
      {/* Sidebar Navigation */}
      <CourseNavigation />

      {/* Main Content */}
      <div className="flex-grow-1 ms-5 ps-5">
        <h2 className="text-danger">
          <FaAlignJustify className="me-4 fs-4 mb-1" />
          {selectedCourse.name} {pathname.split("/")[4] ? `> ${pathname.split("/")[4]}` : ""}
        </h2>

        {/* Course Routes */}
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
