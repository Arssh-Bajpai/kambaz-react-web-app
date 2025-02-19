import { Form, Button, Container, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <Container fluid className="vh-100">
      <Row>
        {/* Sidebar Navigation - Now properly positioned */}
        <Col xs={2} className="bg-white text-black p-3 vh-100 d-flex flex-column align-items-start">
          <h3 className="fw-bold mb-3">Account</h3>
          <Link to="/Kambaz/Account/Signup" className="text-danger mb-2">Signup</Link>
          <Link to="/Kambaz/Account/Profile" className="text-danger">Profile</Link>
        </Col>

        {/* Signin Form Section */}
        <Col xs={10} className="d-flex align-items-center justify-content-start p-5">
          <div className="border p-4 rounded shadow-sm" style={{ maxWidth: "400px" }}>
            <h2 className="mb-3">Sign In</h2>
            <Form>
              <Form.Group className="mb-3">
                <Form.Control placeholder="Username" />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Control type="password" placeholder="Password" />
              </Form.Group>

              <Button className="btn btn-primary w-100 mb-2">Sign in</Button>
            </Form>

            <div className="text-center">
              Don't have an account? <Link to="/Kambaz/Account/Signup" className="text-primary">Sign up</Link>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
}
