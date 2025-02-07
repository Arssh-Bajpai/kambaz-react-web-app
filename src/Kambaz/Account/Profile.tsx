import { Form, Button, Container } from "react-bootstrap";

export default function Profile() {
  return (
    <Container fluid className="wd-account-container">
      <div className="wd-profile-wrapper">
        <div className="wd-profile-box">
          <h2 className="wd-signin-title">Profile</h2>
          <Form>
            <Form.Group controlId="fullname">
              <Form.Control type="text" placeholder="Full Name" />
            </Form.Group>

            <Form.Group controlId="username" className="mt-3">
              <Form.Control type="text" placeholder="Username" />
            </Form.Group>

            <Form.Group controlId="email" className="mt-3">
              <Form.Control type="email" placeholder="Email" />
            </Form.Group>

            <Form.Group controlId="dob" className="mt-3">
              <Form.Control type="date" />
            </Form.Group>

            <Button className="wd-profile-btn mt-3" variant="danger">
              Signout
            </Button>
          </Form>
        </div>
      </div>
    </Container>
  );
}
