import { Modal, Form, Button } from "react-bootstrap";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";

interface AssignmentEditorProps {
  show: boolean;
  handleClose: () => void;
  dialogTitle: string;
  assignmentId?: string; // optional, for editing
  updateAssignment: (assignment: any) => void;
  addAssignment: (assignment: any) => void;
  assignmentName: string;
  setAssignmentName: React.Dispatch<React.SetStateAction<string>>; // state for assignment name
}

export default function AssignmentEditor({
  show,
  handleClose,
  dialogTitle,
  assignmentId,
  updateAssignment,
  addAssignment,
  assignmentName,
  setAssignmentName,
}: AssignmentEditorProps) {
  const { cid } = useParams<{ cid: string }>();

  // form state
  const [title, setTitle] = useState(assignmentName || ""); // Start with the passed assignmentName
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  // if editing, you could load the existing assignment here
  useEffect(() => {
    if (assignmentId) {
      // Fetch the assignment from Redux store if you want to pre-fill on edit
      // E.g., dispatch(selectAssignment(assignmentId))
    } else {
      // reset for new
      setTitle("");
      setDescription("");
      setPoints(100);
      setDueDate("");
      setAvailableFrom("");
      setAvailableUntil("");
    }
  }, [assignmentId, show]);

  const handleSave = () => {
    const payload = {
      _id: assignmentId,
      title,
      description,
      points,
      dueDate,
      availableFrom,
      availableUntil,
      course: cid,
    };

    if (assignmentId) {
      updateAssignment(payload); // Dispatch update for existing assignment
    } else {
      addAssignment(payload); // Dispatch add for new assignment
    }

    handleClose(); // Close the modal after saving
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>{dialogTitle}</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value); // Update assignment title
                setAssignmentName(e.target.value); // Also update the parent state
              }}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Available Until</Form.Label>
            <Form.Control
              type="date"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
