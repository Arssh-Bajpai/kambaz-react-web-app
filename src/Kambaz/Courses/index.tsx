import { Routes, Route, Navigate } from "react-router-dom";
import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import Home from "./Home";

export default function Courses() {
  return (
    <div className="d-flex">
      {/* ✅ Course Navigation Sidebar */}
      <div className="d-none d-md-block bg-light p-3" style={{ minWidth: "200px" }}>
        <CourseNavigation />
      </div>

      {/* ✅ Main Content */}
      <div className="flex-fill p-3">
        <h2 className="text-danger">Course 1234</h2>
        <hr />
        <Routes>
          <Route path="/" element={<Navigate to="Home" />} />
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
