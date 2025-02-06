import { Link } from "react-router-dom";

export default function Assignments() {
  return (
    <div>
      <h2>Assignments</h2>
      <ul className="list-group">
        <li className="list-group-item">
          <Link to="A1">Assignment 1</Link>
        </li>
        <li className="list-group-item">
          <Link to="A2">Assignment 2</Link>
        </li>
      </ul>
    </div>
  );
}
