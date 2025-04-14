import { ListGroup } from "react-bootstrap";
import { useState } from "react";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { MdDescription } from "react-icons/md";
import { Link } from "react-router-dom";
import "../../styles.css";
import { useParams } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import assignments from "../../Database/assignments.json";
import { deleteAssignment, updateAssignment } from "./reducer";

export default function Assignments() {
  const { cid } = useParams();
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const filteredAssignments = assignments.filter((assignment: any) => assignment.course === cid);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();
  const [editingAssignmentId] = useState<string | null>(null);

  return (
    <div id="wd-assignments">
      {isFaculty && (
        <AssignmentControls 
          assignmentId={editingAssignmentId || undefined}
          updateAssignment={(updatedAssignment) => dispatch(updateAssignment(updatedAssignment))}
        />
      )}
      <br /><br /><br /><br />

      <ListGroup className="rounded-0" id="wd-assignments-list">
        {filteredAssignments.map((assignment: any) => (
          <li key={assignment._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary text-black">
              <BsGripVertical className="me-2 fs-3" /> {assignment.title}
              {isFaculty && (
                <ModuleControlButtons 
                  moduleId={assignment._id}
                  deleteModule={() => dispatch(deleteAssignment(assignment._id))}
                  editModule={() => updateAssignment(assignment._id)} 
                />
              )}
            </div>
            
            <ul className="wd-lessons list-group rounded-0">
              <li className="wd-lesson list-group-item p-3 d-flex align-items-start">
                <BsGripVertical className="me-2 fs-3 text-gray" />
                <MdDescription className="me-2 text-success fs-4" />
                <div className="flex-grow-1">
                  <Link to={`./${assignment._id}`} className="fw-semibold text-dark mb-1 text-decoration-none">
                    {assignment.title}
                  </Link>
                  <p className="text-sm mb-1">
                    <span className="text-danger">{assignment.course}</span>
                  </p>
                </div>
                <LessonControlButtons />
              </li>
            </ul>
          </li>
        ))}
      </ListGroup>
    </div>
  );
}
