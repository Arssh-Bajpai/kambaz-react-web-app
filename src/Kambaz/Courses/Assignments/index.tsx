import { BsGripVertical } from "react-icons/bs";
import AssignmentControlButtons from "./AssignmentControlButtons";
import { Button } from "react-bootstrap";
import AssignmentControl from "./AssignmentControls";
import { CiSearch } from "react-icons/ci";
import { Link, useParams, useNavigate } from "react-router-dom";
import * as assignmentClient from "./client.ts";
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ListGroup } from "react-bootstrap";
import "./style.css";

export default function Assignments() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [assignments, setAssignments] = useState<any[]>([]);

  useEffect(() => {
    const fetchAssignments = async () => {
      try {
        const data = await assignmentClient.findAssignmentsForCourse(cid!);
        if (Array.isArray(data)) {
          setAssignments(data);
        } else {
          console.error("Expected an array but got:", data);
          setAssignments([]);
        }
      } catch (err) {
        console.error("Failed to fetch assignments:", err);
        setAssignments([]);
      }
    };
    fetchAssignments();
  }, [cid]);

  const deleteAssignment = async (assignmentId: string) => {
    if (window.confirm("Are you sure you'd like to delete?")) {
      await assignmentClient.deleteAssignment(assignmentId);
      setAssignments(assignments.filter((a) => a._id !== assignmentId));
    }
  };

  return (
    <div id="wd-assignments" className="container">
      <div id="search-buttons-top" className="d-flex justify-content-between align-items-center gap-2">
        <div className="search-assignment justify-content-start">
          <CiSearch />
          <input
            placeholder="Search for Assignments"
            id="wd-search-assignment"
            className="search-input"
          />
        </div>
        <div className="right-aligned-buttons justify-content-end">
          <Button
            size="lg"
            className="me-1 float-end"
            id="wd-add-assignment-group"
            variant="outline-secondary"
          >
            + Group
          </Button>
          <Button
            size="lg"
            className="me-1 float-end"
            id="wd-add-assignment"
            variant="danger"
            onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments/new`)}
          >
            + Assignment
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" /> Assignments
            <span
              id="wd-assignments-percentage"
              className="border rounded-pill px-3 py-1 text-muted ms-auto"
            >
              40% of Total
            </span>
            <AssignmentControl />
          </div>

          <ListGroup className="wd-lessons rounded-0 assignment-item">
            {assignments.map((assignment) => (
              <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1">
                <BsGripVertical className="me-2 fs-3" />
                <Link
                  to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                  className="wd-assignment-link fw-bold"
                >
                  {assignment.title}
                </Link>
                <div className="d-flex align-items-center justify-content-between">
                  <span className="text-muted">
                    <span className="text-danger">{assignment.module}</span> |{" "}
                    <b>Not available until</b> {assignment.available} | <b>Due</b>{" "}
                    {assignment.due} | {assignment.points} pts
                  </span>
                  <Button variant="danger" onClick={() => deleteAssignment(assignment._id)}>
                    <FaTrash />
                  </Button>
                  <AssignmentControlButtons />
                </div>
              </ListGroup.Item>
            ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}