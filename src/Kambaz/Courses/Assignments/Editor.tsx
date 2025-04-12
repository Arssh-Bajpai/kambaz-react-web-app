import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { addAssignment, updateAssignment } from "./reducer";


export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { assignments } = useSelector((state: any) => state.assignmentReducer);
  const existing = aid !== "new" ? assignments.find((a: any) => a._id === aid) : null;

  const [assignment, setAssignment] = useState({
    title: existing?.title || "",
    description: existing?.description || "",
    points: existing?.points || 100,
    dueDate: existing?.due || "",
    startDate: existing?.available || "",
    endDate: existing?.end || "",
  });

  const handleSave = () => {
    if (aid === "new") {
      dispatch(addAssignment({ 
        title: assignment.title,
        course: cid,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        startDate: assignment.startDate,
        endDate: assignment.endDate
      }));
    } else {
      dispatch(
        updateAssignment({
          _id: aid,
          title: assignment.title,
          description: assignment.description,
          points: assignment.points,
          due: assignment.dueDate,
          available: assignment.startDate,
          end: assignment.endDate,
        })
      );
    }
    navigate(`/Kanbas/Courses/${cid}/Assignments`);
  };

  return (
    <div id="wd-assignments-editor">

      {assignment && <>

        <label htmlFor="wd-name">Assignment Name</label>
        <div>
          <input id="wd-name" className="form-control mb-2" value={`${assignment.title}`}
            onChange={(e) => setAssignment({ ...assignment, title: e.target.value })} />
          <br />

          <textarea className="form-control mb-2" id="wd-description" cols={50} rows={8} value={assignment.description}
            onChange={(e) => setAssignment({ ...assignment, description: e.target.value })}>
          </textarea><br />
        </div>

        <div id="wd-assignment-editor-rows" className="d-flex flex-column justify-content-center">
          <div className="d-flex flex-row mb-4 text-nowrap">
            <label htmlFor="wd-points" className="form-label p-2 w-25">Points</label>
            <input id="wd-points" type="number" className="form-control" value={`${assignment.points}`} 
              onChange={(e) => setAssignment({...assignment, points: parseInt(e.target.value),})}/>
          </div>

          <div className="d-flex flex-row mb-4 text-nowrap">
            <label htmlFor="wd-group" className="form-label p-2 w-25">Assignment Group</label>
            <select id="wd-group" className="form-select">
              <option selected value="ASSIGNMENTS">ASSIGNMENTS</option>
            </select>
          </div>

          <div className="d-flex flex-row mb-4 text-nowrap">
            <label htmlFor="wd-display-grade-as" className="form-label p-2 w-25">Display Grade as</label>
            <select id="wd-display-grade-as" className="form-select">
              <option selected value="Percentage">Percentage</option>
            </select>
          </div>

          <div className="d-flex flex-row mb-4 text-nowrap">
            <label htmlFor="wd-submission-type" className="form-label p-2 w-25"> Submission Type</label>

            <div className="rounded-box mb-3 p-3 w-100 border">
              <select id="wd-submission-type" className="form-select">
                <option selected value="Online">Online</option>
              </select>
              <label htmlFor="wd-online-entry-options" className="form-label mt-3">
                <b>Online Entry Options</b>
              </label>

              <div id="wd-online-entry-options">
                <div>
                  <input type="checkbox" name="check-entry" id="wd-text-entry" className="form-check-input" />
                  <label htmlFor="wd-chkbox-text" className="form-label mb-3 ms-3">Text Entry</label><br />
                </div>
                <div>
                  <input type="checkbox" name="check-entry" id="wd-website-url" className="form-check-input" />
                  <label htmlFor="wd-chkbox-website" className="form-label mb-3 ms-3">Website Url</label><br />
                </div>
                <div>
                  <input type="checkbox" name="check-entry" id="wd-media-recordings" className="form-check-input" />
                  <label htmlFor="wd-chkbox-media" className="form-label mb-3 ms-3">Media Recordings</label><br />
                </div>
                <div>
                  <input type="checkbox" name="check-entry" id="wd-student-annotation" className="form-check-input" />
                  <label htmlFor="wd-chkbox-annotation" className="form-label mb-3 ms-3">Student Annotation</label>
                </div>
                <div>
                  <input type="checkbox" name="check-entry" id="wd-file-uploads" className="form-check-input" />
                  <label htmlFor="wd-chkbox-upload" className="form-label mb-3 ms-3">File Uploads</label>
                </div>
              </div>
            </div>
          </div>

          <div className="d-flex flex-row mb-4 text-nowrap">
            <label htmlFor="wd-assign" className="form-label p-2 w-25">Assign</label>

            <div className="rounded-box mb-3 p-3 w-100 border">

              <label htmlFor="wd-assign-to" className="form-label mb-3"> <b> Assign To </b> </label>

              <input id="wd-assign-to" value="Everyone" className="form-control mb-3" />

              <label htmlFor="wd-due-date" className="form-label mb-3"> <b>Due</b> </label>
              <input type="date" id="wd-text-fields-due" value={`${assignment.dueDate}`} className="form-control mb-3" 
                onChange={(e) => setAssignment({...assignment, dueDate: e.target.value, }) } />

              <div className="row">
                <div className="col">
                  <label htmlFor="wd-available-from" className="form-label mb-3"> <b>Avaible from</b></label>
                  <input type="date" id="wd-text-fields-due" value={`${assignment.startDate}`} className="form-control mb-3" 
                    onChange={(e) => setAssignment({ ...assignment, startDate: e.target.value,})}/>
                </div>

                <div className="col">
                  <label htmlFor="wd-until" className="form-label mb-3"> <b>Until</b> </label>
                  <input type="date" id="wd-text-fields-due" value={`${assignment.startDate}`} className="form-control mb-3" 
                    onChange={(e) => setAssignment({ ...assignment, startDate: e.target.value,})}/>
                </div>
              </div>

            </div>
          </div>
        </div>
        <div className="d-flex justify-content-end">
          <button
            onClick={() => navigate(`/Kanbas/Courses/${cid}/Assignments`)}
            className="btn btn-secondary me-2"
            type="button"
          >
            Cancel
          </button>
          <button onClick={handleSave} type="button" className="btn btn-danger">
            Save
          </button>
        </div>
      </>}
    </div>
  );
}