import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { useState } from "react";
import AssignmentEditor from "./Editor";

interface AssignmentControlsProps {
  assignmentId?: string;
  updateAssignment: (assignment: any) => void;
}

export default function AssignmentControls({ assignmentId, updateAssignment }: AssignmentControlsProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-assignment-controls" className="text-nowrap">
      <Button variant="danger" size="lg" className="me-1 float-end" onClick={handleShow}>
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        {assignmentId ? "Edit Assignment" : "New Assignment"}
      </Button>
      {show && <AssignmentEditor assignmentId={assignmentId} updateAssignment={updateAssignment} handleClose={handleClose} />}
    </div>
  );
}