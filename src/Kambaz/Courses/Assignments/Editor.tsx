import { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { updateAssignment, closeAssignmentEditor } from "./reducer";
import { Assignment } from "./reducer";

interface AssignmentEditorProps {
  show: boolean;
  handleClose: () => void;
}

export default function AssignmentEditor({ show, handleClose }: AssignmentEditorProps) {
  const dispatch = useDispatch();
  // Correctly reference the UI slice under "assignments"
  const assignmentToEdit = useSelector(
    (state: any) => state.assignments.ui.assignmentToEdit
  ) as Assignment | null;

  const [assignment, setAssignment] = useState<Assignment>({
    _id: "",
    course: "",
    name: "",
    description: "",
    points: 100,
    dueDate: "",
    availableFrom: "",
    availableUntil: "",
  });

  // Whenever assignmentToEdit changes, sync local state
  useEffect(() => {
    if (assignmentToEdit) {
      setAssignment(assignmentToEdit);
    }
  }, [assignmentToEdit]);

  const handleChange = (field: keyof Assignment, value: any) => {
    setAssignment((prev) => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    if (assignment._id) {
      dispatch(updateAssignment(assignment));
    }
    dispatch(closeAssignmentEditor());
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>Edit Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              value={assignment.name}
              onChange={(e) => handleChange("name", e.target.value)}
            />
          </Form.Group>
          {/* ... more fields ... */}
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
