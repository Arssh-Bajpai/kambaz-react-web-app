// src/Kambaz/Courses/Assignments/index.tsx
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { Container, Row, Col, Form, Button, ListGroup } from "react-bootstrap";
import { FaPlus, FaTrash, FaPen, FaCheckCircle } from "react-icons/fa";
import {
  deleteAssignment,
  openAssignmentCreator,
  closeAssignmentCreator,
  openAssignmentEditor,
  closeAssignmentEditor,
  setAssignmentSearchTerm,
} from "./reducer";
import Creator from "./CreateAss";
import AssignmentEditor from "./Editor";

export default function Assignments() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  // Now we reference state.assignments.ui and state.assignments.assignments
  const showCreator = useSelector((state: any) => state.assignments.ui.showAssignmentCreator);
  const showEditor = useSelector((state: any) => state.assignments.ui.showAssignmentEditor);
  const searchTerm = useSelector((state: any) => state.assignments.ui.assignmentSearchTerm);

  // The actual array of assignments
  const assignments = useSelector((state: any) => state.assignments.assignments.assignments);

  const courseAssignments = assignments.filter((a: any) => a.course === cid);
  const filtered = courseAssignments.filter((a: any) =>
    (a.name || "").toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  const handleGroup = () => {
    alert("Group functionality not yet implemented!");
  };

  return (
    <Container fluid className="wd-main-content">
      <Creator
        show={showCreator}
        handleClose={() => dispatch(closeAssignmentCreator())}
        cid={cid}
      />
      <AssignmentEditor
        show={showEditor}
        handleClose={() => dispatch(closeAssignmentEditor())}
      />

      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6}>
          <h2 className="mb-0">Assignments</h2>
        </Col>
        <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
          <Form className="d-inline-block me-2">
            <Form.Control
              type="text"
              placeholder="Search for Assignment"
              value={searchTerm}
              onChange={(e) => dispatch(setAssignmentSearchTerm(e.target.value))}
              style={{ width: "200px" }}
            />
          </Form>
          <Button variant="danger" className="me-2" onClick={handleGroup}>
            <FaPlus className="me-2" />
            Group
          </Button>
          <Button variant="danger" onClick={() => dispatch(openAssignmentCreator())}>
            <FaPlus className="me-2" />
            Assignment
          </Button>
        </Col>
      </Row>

      {filtered.length === 0 ? (
        <p>No assignments found for this course.</p>
      ) : (
        <ListGroup>
          {filtered.map((assignment: any) => (
            <ListGroup.Item
              key={assignment._id}
              className="d-flex justify-content-between align-items-center"
            >
              <div>
                <div className="d-flex align-items-center">
                  <span className="fw-bold">{assignment.name}</span>
                  <Button
                    variant="outline-secondary"
                    size="sm"
                    className="ms-2"
                    onClick={() => dispatch(openAssignmentEditor(assignment))}
                  >
                    <FaPen />
                  </Button>
                </div>
                <br />
                <small className="text-muted">
                  {assignment.dueDate ? `Due ${assignment.dueDate}` : "No Due Date"}
                </small>
              </div>
              <div className="d-flex align-items-center">
                <FaCheckCircle className="text-success me-3" />
                <Button
                  variant="outline-danger"
                  size="sm"
                  onClick={() => handleDelete(assignment._id)}
                >
                  <FaTrash />
                </Button>
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </Container>
  );
}
