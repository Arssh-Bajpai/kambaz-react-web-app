// src/Kambaz/Courses/index.tsx
import { Routes, Route, useParams } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
// Remove AssignmentEditor import if it’s only used as a modal within Assignments
// import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import "../styles.css";
import { courses } from "../Database";

export default function Courses() {
  // Extract `cid` from URL
  const { cid } = useParams();
  console.log("🚀 useParams() returned:", cid || "❌ No cid found");

  if (!cid) {
    console.error("❌ cid is undefined. Ensure the route includes ':cid'.");
  }

  // Ensure `courses` is loaded properly
  console.log("📚 courses array:", courses);

  // Find the course by ID
  const course = cid
    ? courses?.find((course) => {
        console.log("🔍 Checking course:", course._id.toString(), "against cid:", cid);
        return course._id.toString() === cid;
      })
    : undefined;

  console.log("✅ Matching course found:", course || "❌ No matching course found");

  // Set the course name
  const courseName = course?.name || "Course Not Found";
  console.log("📌 Final Course Name:", courseName);

  return (
    <div id="wd-courses" className="d-flex">
      {/* Sidebar Navigation */}
      <div className="wd-sidebar">
        <h1 className="wd-course-title">{courseName}</h1>
        <CourseNavigation />
      </div>

      {/* Main Content */}
      <div className="wd-main-content">
        <Routes>
          <Route path="Home" element={<Home />} />
          <Route path="Modules" element={<Modules />} />
          {/* Only one route for Assignments - the modal for editing is handled internally */}
          <Route path="Assignments/*" element={<Assignments />} />
          <Route path="People" element={<PeopleTable />} />
        </Routes>
      </div>
    </div>
  );
}
