// src/Kambaz/Courses/Assignments/Creator.tsx
import { useState } from "react";
import { Modal, Form, Button, Row, Col } from "react-bootstrap";

interface CreatorProps {
  show: boolean;
  onHide: () => void;
  onSave: (data: any) => void; // callback to create the assignment
}

export default function Creator({ show, onHide, onSave }: CreatorProps) {
  const [assignment, setAssignment] = useState({
    name: "New Assignment",
    description: "New Assignment Description",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  // Update local state
  const handleChange = (field: string, value: any) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };

  // When user clicks Save
  const handleSave = () => {
    // Pass the assignment data back up
    onSave(assignment);
    onHide(); // close the modal
  };

  return (
    <Modal show={show} onHide={onHide} centered>
      <Modal.Header closeButton>
        <Modal.Title>New Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          {/* Name */}
          <Form.Group controlId="assignmentName" className="mb-3">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={assignment.name ?? ""}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Group>

          {/* Description */}
          <Form.Group controlId="assignmentDescription" className="mb-3">
            <Form.Label>Assignment Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={assignment.description ?? ""}
              onChange={(e) => handleChange("description", e.target.value)}
            />
          </Form.Group>

          {/* Points */}
          <Form.Group controlId="assignmentPoints" className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={assignment.points ?? ""}
              onChange={(e) => handleChange("points", parseInt(e.target.value) || 0)}
            />
          </Form.Group>

          {/* Due Date, Available From, Until */}
          <Row>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="dueDate">
                <Form.Label>Due</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.dueDate ?? ""}
                  onChange={(e) => handleChange("dueDate", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="availableFrom">
                <Form.Label>Available from</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.availableFrom ?? ""}
                  onChange={(e) => handleChange("availableFrom", e.target.value)}
                />
              </Form.Group>
            </Col>
            <Col md={4}>
              <Form.Group className="mb-3" controlId="availableUntil">
                <Form.Label>Until</Form.Label>
                <Form.Control
                  type="date"
                  value={assignment.availableUntil ?? ""}
                  onChange={(e) => handleChange("availableUntil", e.target.value)}
                />
              </Form.Group>
            </Col>
          </Row>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onHide}>
          Cancel
        </Button>
        <Button variant="danger" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
