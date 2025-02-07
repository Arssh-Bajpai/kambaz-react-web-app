import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signup() {
  return (
    <Container fluid className="wd-account-container d-flex justify-content-center align-items-center vh-100">
      <div className="wd-signup-box">
        <h2 className="wd-signup-title text-center">Signup</h2>

        <Form className="wd-signup-form">
          {/* Username Input */}
          <Form.Group controlId="username" className="mb-3">
            <Form.Control type="text" placeholder="Username" required />
          </Form.Group>

          {/* Email Input */}
          <Form.Group controlId="email" className="mb-3">
            <Form.Control type="email" placeholder="Email" required />
          </Form.Group>

          {/* Password Input */}
          <Form.Group controlId="password" className="mb-3">
            <Form.Control type="password" placeholder="Password" required />
          </Form.Group>

          {/* Signup Button */}
          <Button className="wd-signup-btn w-100" variant="success" type="submit">
            Signup
          </Button>

          {/* Signin Redirect */}
          <p className="mt-3 text-center">
            Already have an account?{" "}
            <Link to="/Kambaz/Account/Signin" className="wd-signin-link">
              Sign in
            </Link>
          </p>
        </Form>
      </div>
    </Container>
  );
}
