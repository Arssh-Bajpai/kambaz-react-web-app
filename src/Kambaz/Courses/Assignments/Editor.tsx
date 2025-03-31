// src/Kambaz/Courses/Assignments/AssignmentEditor.tsx
import { useState, useEffect } from "react";
import { Container, Form, Button } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { addAssignment, updateAssignment } from "./reducer";

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // course ID, assignment ID
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // All assignments from Redux
  const assignments = useSelector((state: any) => state.assignments.assignments);
  // If we have an assignment ID, find that assignment
  const existing = assignments.find(
    (a: any) => a._id === aid && a.course === cid
  );

  // Local state for assignment form fields
  const [assignment, setAssignment] = useState<any>({
    course: cid,
    name: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  useEffect(() => {
    if (existing) {
      setAssignment(existing);
    }
  }, [existing]);

  const handleChange = (field: string, value: any) => {
    setAssignment((prev: any) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (existing) {
      // Updating existing
      dispatch(updateAssignment(assignment));
    } else {
      // Creating new
      dispatch(addAssignment(assignment));
    }
    // Navigate back to the Assignments list
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const handleCancel = () => {
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  return (
    <Container fluid className="wd-main-content">
      <h3>{existing ? "Edit Assignment" : "New Assignment"}</h3>
      <Form>
        {/* Name */}
        <Form.Group className="mb-3">
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control
            type="text"
            value={assignment.name}
            onChange={(e) => handleChange("name", e.target.value)}
          />
        </Form.Group>

        {/* Description */}
        <Form.Group className="mb-3">
          <Form.Label>Description</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={assignment.description}
            onChange={(e) => handleChange("description", e.target.value)}
          />
        </Form.Group>

        {/* Points */}
        <Form.Group className="mb-3">
          <Form.Label>Points</Form.Label>
          <Form.Control
            type="number"
            value={assignment.points}
            onChange={(e) => handleChange("points", e.target.value)}
          />
        </Form.Group>

        {/* Due Date */}
        <Form.Group className="mb-3">
          <Form.Label>Due Date</Form.Label>
          <Form.Control
            type="date"
            value={assignment.dueDate}
            onChange={(e) => handleChange("dueDate", e.target.value)}
          />
        </Form.Group>

        {/* Available From */}
        <Form.Group className="mb-3">
          <Form.Label>Available From</Form.Label>
          <Form.Control
            type="date"
            value={assignment.availableFrom}
            onChange={(e) => handleChange("availableFrom", e.target.value)}
          />
        </Form.Group>

        {/* Available Until */}
        <Form.Group className="mb-3">
          <Form.Label>Available Until</Form.Label>
          <Form.Control
            type="date"
            value={assignment.availableUntil}
            onChange={(e) => handleChange("availableUntil", e.target.value)}
          />
        </Form.Group>

        {/* Buttons */}
        <div className="d-flex justify-content-between mt-4">
          <Button variant="secondary" onClick={handleCancel}>
            Cancel
          </Button>
          <Button variant="danger" onClick={handleSave}>
            Save
          </Button>
        </div>
      </Form>
    </Container>
  );
}
