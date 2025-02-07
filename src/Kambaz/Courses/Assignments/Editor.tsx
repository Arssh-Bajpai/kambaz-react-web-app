import { useParams } from "react-router-dom";

export default function AssignmentEditor() {
  const { aid } = useParams();

  return (
    <div className="wd-assignment-editor">
      <h2>Assignment {aid}</h2>
      <p>Edit the details of this assignment.</p>
    </div>
  );
}
