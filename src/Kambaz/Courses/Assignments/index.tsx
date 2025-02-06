import { Link } from "react-router-dom";
import { ListGroup } from "react-bootstrap";

export default function Assignments() {
  return (
    <div id="wd-assignments">
      <h2 className="text-danger">Assignments</h2>
      <ListGroup>
        <ListGroup.Item>
          <Link to="A1" className="text-decoration-none">Assignment 1</Link>
        </ListGroup.Item>
        <ListGroup.Item>
          <Link to="A2" className="text-decoration-none">Assignment 2</Link>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
