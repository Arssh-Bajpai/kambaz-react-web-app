import CourseNavigation from "./Navigation";
import { Route, Routes, useParams, useLocation } from "react-router";
import Home from "./Home";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import { FaAlignJustify } from "react-icons/fa";
import { useState } from "react";  

export default function Courses({ courses }: { courses: any[]; }) {
  const { cid } = useParams();
  const course = courses.find((course) => course._id === cid);

  const [assignmentName, setAssignmentName] = useState("");
  const addAssignment = () => {
    console.log("Assignment added:", assignmentName);
  };

  const { pathname } = useLocation();

  return (
    <div id="wd-courses">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1"/>
        {course && course.name}  &gt; {pathname.split("/")[4]}
      </h2>
      <hr />
      <div className="d-flex">
        <div className="d-none d-md-block">
          <CourseNavigation />
        </div>
        <div className="flex-fill" style={{paddingTop: "10px"}}>
          <Routes>
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route 
              path="Assignments/:aid" 
              element={
                <AssignmentEditor
                  show={true}  
                  handleClose={() => {}}
                  dialogTitle="Create Assignment"
                  assignmentName={assignmentName}
                  setAssignmentName={setAssignmentName}
                  addAssignment={addAssignment}
                />
              }
            />
          </Routes>
        </div>
      </div>
    </div>
  );
}