import { useState } from "react";
import { Navigate, Route, Routes, useParams, useLocation } from "react-router";
import { FaAlignJustify } from "react-icons/fa";

import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Quizzes from "./Quizzes/index.tsx";
import Home from "./Home/index.tsx";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";
import QuestionRouter from "./Quizzes/QuestionRouter.tsx";
import QuizPreview from "./Quizzes/QuizPreview.tsx";
import QuizEditor from "./Quizzes/QuizEditor.tsx";

export default function Courses({ courses }: { courses: any[] }) {
  const { cid } = useParams();
  const { pathname } = useLocation();
  const course = courses.find((course) => course._id === cid);

  // AssignmentEditor state and props
  const [assignmentName, setAssignmentName] = useState("");

  const addAssignment = (newAssignment: any) => {
    console.log("Adding assignment:", newAssignment);
    // TODO: call backend or update Redux
  };

  const updateAssignment = (updatedAssignment: any) => {
    console.log("Updating assignment:", updatedAssignment);
    // TODO: call backend or update Redux
  };

  const handleClose = () => {
    console.log("Closing AssignmentEditor");
    // Typically toggle a modal open/close; here it's for route-based navigation
  };

  return (
    <div className="d-flex flex-column">
      <h2 className="text-danger">
        <FaAlignJustify className="me-4 fs-4 mb-1" />
        {course && course.name} &gt; {pathname.split("/")[4]}
      </h2>
      <hr />

      <div id="wd-courses" className="d-flex flex-row">
        <div className="d-none d-md-flex flex-column p-3">
          <CourseNavigation />
        </div>

        <div className="d-flex flex-column flex-grow-1 p-4">
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Home" element={<Home />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route
              path="Assignments/:aid"
              element={
                <AssignmentEditor
                  show={true}
                  handleClose={handleClose}
                  dialogTitle="Edit Assignment"
                  updateAssignment={updateAssignment}
                  addAssignment={addAssignment}
                  assignmentName={assignmentName}
                  setAssignmentName={setAssignmentName}
                />
              }
            />
            <Route path="People" element={<PeopleTable />} />
            <Route path="Quizzes/:qid/new/:type" element={<QuestionRouter />} />
            <Route path="Quizzes/:qid/preview" element={<QuizPreview />} />
            <Route path="Quizzes/:qid" element={<QuizEditor />} />
            <Route path="Quizzes/new" element={<QuizEditor />} />
            <Route path="Quizzes" element={<Quizzes />} />
          </Routes>
        </div>
      </div>
    </div>
  );
}
