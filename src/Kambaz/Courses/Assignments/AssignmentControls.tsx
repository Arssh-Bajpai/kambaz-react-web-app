import { FaPlus } from "react-icons/fa6";
import { Button } from "react-bootstrap";
import { useState } from "react";
import AssignmentEditor from "./Editor";

interface AssignmentControlsProps {
  /**
   * when undefined → “new” flow
   * when set      → “edit” flow
   */
  assignmentId?: string;
  /** called with the full assignment object */
  updateAssignment: (assignment: any) => void;
  /** called when creating */
  addAssignment: (assignment: any) => void;
}

export default function AssignmentControls({
  assignmentId,
  updateAssignment,
  addAssignment,
}: AssignmentControlsProps) {
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // dialog title depends on flow
  const dialogTitle = assignmentId ? "Edit Assignment" : "New Assignment";

  return (
    <div id="wd-assignment-controls" className="text-nowrap mb-4">
      <Button
        variant="danger"
        size="lg"
        className="me-1 float-end"
        onClick={handleShow}
      >
        <FaPlus
          className="position-relative me-2"
          style={{ bottom: "1px" }}
        />
        {dialogTitle}
      </Button>

      {show && (
        <AssignmentEditor
                  show={show}
                  handleClose={handleClose}
                  dialogTitle={dialogTitle}
                  assignmentId={assignmentId}
                  // Pass both handlers down; Editor will call the right one
                  updateAssignment={updateAssignment}
                  addAssignment={addAssignment} assignmentName={""} setAssignmentName={function (): void {
                      throw new Error("Function not implemented.");
                  } }        />
      )}
    </div>
  );
}
