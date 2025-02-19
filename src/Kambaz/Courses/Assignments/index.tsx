import { Link } from "react-router-dom";
import { Button, Container, Row, Col, ListGroup, Form } from "react-bootstrap";
import { FaPlus, FaSearch, FaCheckCircle } from "react-icons/fa";

export default function Assignments() {
  return (
    <Container fluid className="wd-main-content">
      <Row className="mb-3 align-items-center">
        <Col md={6}>
          <h2 className="mb-0">Assignments</h2>
        </Col>
        <Col md={6} className="text-end">
          <Button variant="danger">
            <FaPlus className="me-2" /> Group
          </Button>
        </Col>
      </Row>

      {/* Search Bar */}
      <Form className="mb-3">
        <Form.Group controlId="searchAssignments" className="d-flex">
          <Form.Control type="text" placeholder="Search Assignments" />
          <Button variant="secondary" className="ms-2">
            <FaSearch />
          </Button>
        </Form.Group>
      </Form>

      {/* Assignments List */}
      <ListGroup>
        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="/Kambaz/Courses/Assignments/A1" className="text-decoration-none fw-bold">
              A1: Module 1
            </Link>
            <div className="text-muted small">Not available until May 12 at 11:00pm</div>
          </div>
          <FaCheckCircle className="text-success" />
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="/Kambaz/Courses/Assignments/A2" className="text-decoration-none fw-bold">
              A2: Module 2
            </Link>
            <div className="text-muted small">Not available until May 13 at 12:00am</div>
          </div>
          <FaCheckCircle className="text-success" />
        </ListGroup.Item>

        <ListGroup.Item className="d-flex justify-content-between align-items-center">
          <div>
            <Link to="/Kambaz/Courses/Assignments/A3" className="text-decoration-none fw-bold">
              A3: Module 3
            </Link>
            <div className="text-muted small">Due May 17 at 11:59pm</div>
          </div>
          <FaCheckCircle className="text-success" />
        </ListGroup.Item>
      </ListGroup>
    </Container>
  );
}
