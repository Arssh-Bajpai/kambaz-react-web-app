import { useParams, Link } from "react-router-dom";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import assignments from "../../Database/assignments.json"; // Import assignments directly

export default function AssignmentEditor() {
  const { cid, aid } = useParams(); // Get course ID and assignment ID from URL
  const assignment = assignments.find((a) => a._id === aid && a.course === cid); // Find the correct assignment

  if (!assignment) {
    return (
      <Container fluid className="wd-main-content">
        <h2>Assignment Not Found</h2>
      </Container>
    );
  }

  return (
    <Container fluid className="wd-main-content">
      <h2 className="mb-4">{assignment.title}</h2> {/* Display assignment title */}

      <Form>
        {/* Assignment Title */}
        <Form.Group controlId="assignmentTitle">
          <Form.Label>Assignment Title</Form.Label>
          <Form.Control type="text" defaultValue={assignment.title} />
        </Form.Group>

        {/* Assignment Instructions */}
        <Form.Group controlId="assignmentInstructions" className="mt-3">
          <Form.Text className="text-muted">
            <p>
              The assignment is <span className="text-danger">available online</span>.
            </p>
            <p>Submit a link to the landing page of your Web application running on <a href="#">Netlify</a>.</p>
            <p>The landing page should include:</p>
            <ul>
              <li>Your full name and section</li>
              <li>Links to each of the lab assignments</li>
              <li>Link to the Kanbas application</li>
              <li>Links to all relevant source code repositories</li>
            </ul>
          </Form.Text>
        </Form.Group>

        {/* Points */}
        <Row className="mt-4">
          <Col md={6}>
            <Form.Group controlId="points">
              <Form.Label>Points</Form.Label>
              <Form.Control type="number" placeholder="100" />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="assignmentGroup">
              <Form.Label>Assignment Group</Form.Label>
              <Form.Select>
                <option>ASSIGNMENTS</option>
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>

        {/* Display Grade */}
        <Form.Group controlId="displayGrade" className="mt-3">
          <Form.Label>Display Grade as</Form.Label>
          <Form.Select>
            <option>Percentage</option>
          </Form.Select>
        </Form.Group>

        {/* Submission Type */}
        <Form.Group controlId="submissionType" className="mt-4">
          <Form.Label>Submission Type</Form.Label>
          <Form.Select>
            <option>Online</option>
          </Form.Select>
        </Form.Group>

        {/* Online Entry Options */}
        <Form.Group controlId="onlineOptions" className="mt-3">
          <Form.Label>Online Entry Options</Form.Label>
          <Form.Check type="checkbox" label="Text Entry" />
          <Form.Check type="checkbox" label="Website URL" defaultChecked />
          <Form.Check type="checkbox" label="Media Recordings" />
          <Form.Check type="checkbox" label="Student Annotation" />
          <Form.Check type="checkbox" label="File Uploads" />
        </Form.Group>

        {/* Assign To */}
        <Form.Group controlId="assignTo" className="mt-4">
          <Form.Label>Assign To</Form.Label>
          <Form.Control type="text" value="Everyone" readOnly />
        </Form.Group>

        {/* Due Date & Availability */}
        <Row className="mt-3">
          <Col md={6}>
            <Form.Group controlId="dueDate">
              <Form.Label>Due</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>

          <Col md={6}>
            <Form.Group controlId="availableFrom">
              <Form.Label>Available From</Form.Label>
              <Form.Control type="date" />
            </Form.Group>
          </Col>
        </Row>

        {/* Save and Cancel Buttons */}
        <div className="mt-4 d-flex justify-content-between">
          <Link to={`/Kambaz/Courses/${cid}/Assignments`}>
            <Button variant="secondary">Cancel</Button>
          </Link>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </Container>
  );
}
