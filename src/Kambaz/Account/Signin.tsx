import { Form, Button, Container } from "react-bootstrap";
import { Link } from "react-router-dom";

export default function Signin() {
  return (
    <Container fluid className="wd-account-container">
      {/* Left Sidebar */}
      <div className="wd-sidebar-container">
        <h5 className="wd-sidebar-title">Account</h5>
        <ul className="wd-account-menu">
          <li><Link to="/Account/Signin" className="wd-account-link">Signin</Link></li>
          <li><Link to="/Account/Signup" className="wd-account-link">Signup</Link></li>
          <li><Link to="/Account/Profile" className="wd-account-link">Profile</Link></li>
        </ul>
      </div>

      {/* Centered Sign-in Form */}
      <div className="wd-signin-wrapper">
        <div className="wd-signin-box">
          <h2 className="wd-signin-title">Signin</h2>
          <Form>
            <Form.Group controlId="username">
              <Form.Control type="text" placeholder="username" />
            </Form.Group>

            <Form.Group controlId="password" className="mt-3">
              <Form.Control type="password" placeholder="password" />
            </Form.Group>

            <Button className="wd-signin-btn mt-3" variant="primary" type="submit">
              Signin
            </Button>

            <p className="mt-2">
              <Link to="/Account/Signup" className="wd-signup-link">Signup</Link>
            </p>
          </Form>
        </div>
      </div>

      {/* Right Navigation */}
      <div className="wd-account-sidebar">
        <h5 className="wd-sidebar-title">Navigation</h5>
        <ul className="wd-account-menu">
          <li><Link to="/Signup" className="wd-account-link">Signup</Link></li>
          <li><Link to="/Signin" className="wd-account-link">Signin</Link></li>
          <li><Link to="/Profile" className="wd-account-link">Profile</Link></li>
        </ul>
      </div>
    </Container>
  );
}
