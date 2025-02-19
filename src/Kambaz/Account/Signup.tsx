import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <Container fluid className="vh-100">
      <Row>
        {/* Sidebar Navigation */}
        <Col xs={2} className="bg-white text-black p-3 vh-100 d-flex flex-column align-items-start">
          <h3 className="fw-bold mb-3">Account</h3>
          <Link to="/Kambaz/Account/Signup" className="text-danger mb-2">Signup</Link>
          <Link to="/Kambaz/Account/Profile" className="text-danger">Profile</Link>
        </Col>

        {/* Signup Form Section */}
        <Col xs={10} className="p-5">
          <h2 className="mb-4">Signup</h2>

          <div className="border p-4 rounded shadow-sm" style={{ maxWidth: "400px" }}>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control placeholder="Username" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="email" placeholder="Email" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button className="btn btn-success w-100 mb-2">Signup</Button>
            </Form>

            <div className="text-center">
              Already have an account? <Link to="/Kambaz/Account/Signin" className="text-primary">Sign in</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
