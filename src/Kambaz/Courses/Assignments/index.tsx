import { ListGroup, Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { BsGripVertical } from "react-icons/bs";
import AssignmentControls from "./AssignmentControls";
import ModuleControlButtons from "../Modules/ModuleControlButtons";
import LessonControlButtons from "../Modules/LessonControlButtons";
import { MdDescription } from "react-icons/md";
import { Link, useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  addAssignment,
  deleteAssignment,
  updateAssignment,
} from "./reducer";

export default function Assignments() {
  const { cid } = useParams<{ cid: string }>();
  const dispatch = useDispatch();

  // State for managing assignments and loading status
  const [loading, setLoading] = useState<boolean>(true);
  const [filteredAssignments, setFilteredAssignments] = useState<any[]>([]);

  // Access the assignments from Redux state
  const assignments = useSelector(
    (state: any) => state.assignmentsReducer.assignments
  );

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [editingAssignmentId, setEditingAssignmentId] = useState<
    string | undefined
  >(undefined);

  // Filter assignments by course ID
  useEffect(() => {
    // Simulate loading data (e.g., fetching from API or loading from JSON)
    if (assignments && cid) {
      const filtered = assignments.filter((a: any) => a.course === cid);
      setFilteredAssignments(filtered);
    }
    setLoading(false);
  }, [cid, assignments]);

  const handleSave = (assignment: any) => {
    if (editingAssignmentId) {
      dispatch(updateAssignment(assignment));
    } else {
      dispatch(addAssignment(assignment));
    }
    setEditingAssignmentId(undefined);
  };

  return (
    <div id="wd-assignments">
      {isFaculty && (
        <AssignmentControls
          assignmentId={editingAssignmentId}
          updateAssignment={handleSave}
          addAssignment={handleSave}
        />
      )}

      {loading ? (
        <div className="d-flex justify-content-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : (
        <ListGroup className="rounded-0" id="wd-assignments-list">
          {filteredAssignments.map((assignment: any) => (
            <li
              key={assignment._id}
              className="wd-module list-group-item p-0 mb-5 fs-5 border-gray"
            >
              <div className="wd-title p-3 ps-2 bg-secondary text-black d-flex justify-content-between align-items-center">
                <div>
                  <BsGripVertical className="me-2 fs-3" />
                  {assignment.title}
                </div>

                {isFaculty && (
                  <ModuleControlButtons
                    moduleId={assignment._id}
                    deleteModule={() =>
                      dispatch(deleteAssignment(assignment._id))
                    }
                    editModule={() => setEditingAssignmentId(assignment._id)}
                  />
                )}
              </div>

              <ul className="wd-lessons list-group rounded-0">
                <li className="wd-lesson list-group-item p-3 d-flex align-items-start">
                  <BsGripVertical className="me-2 fs-3 text-gray" />
                  <MdDescription className="me-2 text-success fs-4" />
                  <div className="flex-grow-1">
                    <Link
                      to={`./${assignment._id}`}
                      className="fw-semibold text-dark mb-1 text-decoration-none"
                    >
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
      )}
    </div>
  );
}
