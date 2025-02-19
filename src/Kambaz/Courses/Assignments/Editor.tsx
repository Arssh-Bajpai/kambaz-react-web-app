import { Form, Button, Container, Row, Col } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <Container fluid className="wd-main-content">
      <h2 className="mb-4">Assignment Name</h2>

      <Form>
        <Form.Group controlId="assignmentName">
          <Form.Control type="text" placeholder="A1" />
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

        {/* Due Date */}
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
          <Button variant="secondary">Cancel</Button>
          <Button variant="danger">Save</Button>
        </div>
      </Form>
    </Container>
  );
}