// src/Kambaz/Courses/Assignments/index.tsx
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import {
  Container,
  Row,
  Col,
  Form,
  Button,
  ListGroup,
} from "react-bootstrap";
import { FaPlus, FaTrash, FaPen, FaCheckCircle } from "react-icons/fa";
import { deleteAssignment, addAssignment } from "./reducer";
import Creator from "./Creator";

export default function Assignments() {
  const { cid } = useParams(); // Course ID
  const dispatch = useDispatch();

  // Check if user is faculty/admin
  const currentUser = useSelector((state: any) => state.account.currentUser);
  const isFaculty =
    currentUser && (currentUser.role === "FACULTY" || currentUser.role === "ADMIN");

  // All assignments from Redux
  const assignments = useSelector((state: any) => state.assignments.assignments);
  // Filter by current course
  const courseAssignments = assignments.filter((a: any) => a.course === cid);

  // Local state for search
  const [searchTerm, setSearchTerm] = useState("");

  // Local state to show/hide the Creator modal
  const [showCreator, setShowCreator] = useState(false);

  // Filter by search term
  const filtered = courseAssignments.filter((a: any) =>
    a.title.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Handle delete
  const handleDelete = (assignmentId: string) => {
    if (window.confirm("Are you sure you want to delete this assignment?")) {
      dispatch(deleteAssignment(assignmentId));
    }
  };

  // Called when user saves a new assignment in the Creator modal
  const handleCreateAssignment = (data: any) => {
    dispatch(
      addAssignment({
        course: cid,
        title: data.name,
        description: data.description,
        points: data.points,
        dueDate: data.dueDate,
        availableFrom: data.availableFrom,
        availableUntil: data.availableUntil,
      })
    );
  };

  return (
    <Container fluid className="wd-main-content">
      <Row className="mb-3 align-items-center">
        <Col xs={12} md={6}>
          <h2 className="mb-0">Assignments</h2>
        </Col>
        <Col xs={12} md={6} className="text-md-end mt-3 mt-md-0">
          {/* Search Field */}
          <Form className="d-inline-block me-3">
            <Form.Control
              type="text"
              placeholder="Search for Assignment"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: "200px" }}
            />
          </Form>
          {/* +Group button */}
          <Button variant="danger" className="me-2">
            <FaPlus className="me-2" />
            Group
          </Button>
          {/* +Assignment button (visible only to faculty/admin) */}
          {isFaculty && (
            <Button
              variant="danger"
              onClick={() => setShowCreator(true)}
            >
              <FaPlus className="me-2" />
              Assignment
            </Button>
          )}
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
                <div className="fw-bold">{assignment.title}</div>
                <small className="text-muted">
                  {assignment.dueDate ? `Due ${assignment.dueDate}` : "No Due Date"}
                </small>
              </div>
              <div className="d-flex align-items-center">
                <FaCheckCircle className="text-success me-3" />
                {isFaculty && (
                  <>
                    <Button
                      variant="outline-secondary"
                      size="sm"
                      className="me-2"
                      onClick={() => alert("Edit assignment here.")}
                    >
                      <FaPen />
                    </Button>
                    <Button
                      variant="outline-danger"
                      size="sm"
                      onClick={() => handleDelete(assignment._id)}
                    >
                      <FaTrash />
                    </Button>
                  </>
                )}
              </div>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}

      {/* Creator modal for adding a new assignment */}
      <Creator
        show={showCreator}
        onHide={() => setShowCreator(false)}
        onSave={handleCreateAssignment}
      />
    </Container>
  );
}
