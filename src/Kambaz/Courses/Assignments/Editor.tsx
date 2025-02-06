import { Form, Button } from "react-bootstrap";

export default function AssignmentEditor() {
  return (
    <div>
      <h2>Edit Assignment</h2>
      <Form>
        <Form.Group>
          <Form.Label>Assignment Name</Form.Label>
          <Form.Control type="text" placeholder="Enter assignment name" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Description</Form.Label>
          <Form.Control as="textarea" rows={3} placeholder="Enter description" />
        </Form.Group>

        <Form.Group>
          <Form.Label>Points</Form.Label>
          <Form.Control type="number" placeholder="100" />
        </Form.Group>

        <Button variant="primary" className="mt-3">Save</Button>
      </Form>
    </div>
  );
}
