// src/Kambaz/Courses/Assignments/Editor.tsx
import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";
import * as assignmentClient from "./client";

type AssignmentEditorProps = {
  handleClose: () => void;
};

export default function AssignmentEditor({ handleClose }: AssignmentEditorProps) {
  const { aid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const existing = aid !== "new" ? assignments.find((a: any) => a._id === aid) : null;

  const [assignment, setAssignment] = useState({
    title: existing?.title || "",
    description: existing?.description || "",
    points: existing?.points || 100,
    dueDate: existing?.dueDate || "",
    availableFrom: existing?.availableFrom || "",
    availableUntil: existing?.availableUntil || "",
  });

  const handleSave = async () => {
    if (aid === "new") {
      const created = await assignmentClient.createAssignment({
        title: assignment.title,
        course: cid,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
        availableUntil: assignment.availableUntil,
      });
      dispatch(addAssignment(created));
    } else {
      const updated = await assignmentClient.updateAssignment({
        _id: aid,
        title: assignment.title,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
        availableUntil: assignment.availableUntil,
      });
      dispatch(updateAssignment(updated));
    }
    handleClose();
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor" className="p-4 border rounded bg-light">
      <>
        <label htmlFor="wd-name">Assignment Name</label>
        <input
          id="wd-name"
          className="form-control mb-2"
          value={assignment.title}
          onChange={(e) => setAssignment({ ...assignment, title: e.target.value })}
        />

        <textarea
          className="form-control mb-2"
          id="wd-description"
          cols={50}
          rows={8}
          value={assignment.description}
          onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}
        ></textarea>

        <label htmlFor="wd-points">Points</label>
        <input
          id="wd-points"
          type="number"
          className="form-control mb-2"
          value={assignment.points}
          onChange={(e) => setAssignment({ ...assignment, points: parseInt(e.target.value) })}
        />

        <label htmlFor="wd-due-date">Due Date</label>
        <input
          type="date"
          id="wd-due-date"
          className="form-control mb-2"
          value={assignment.dueDate}
          onChange={(e) => setAssignment({ ...assignment, dueDate: e.target.value })}
        />

        <label htmlFor="wd-available-from">Available From</label>
        <input
          type="date"
          id="wd-available-from"
          className="form-control mb-2"
          value={assignment.availableFrom}
          onChange={(e) => setAssignment({ ...assignment, availableFrom: e.target.value })}
        />

        <label htmlFor="wd-available-until">Available Until</label>
        <input
          type="date"
          id="wd-available-until"
          className="form-control mb-2"
          value={assignment.availableUntil}
          onChange={(e) => setAssignment({ ...assignment, availableUntil: e.target.value })}
        />

        <div className="d-flex justify-content-end">
          <button onClick={handleClose} className="btn btn-secondary me-2">
            Cancel
          </button>
          <button onClick={handleSave} className="btn btn-danger">
            Save
          </button>
        </div>
      </>
    </div>
  );
}
