import { Link, useParams } from "react-router-dom";
import { Button, Container, Row, Col, ListGroup } from "react-bootstrap";
import { FaPlus, FaCheckCircle } from "react-icons/fa";
import assignments from "../../Database/assignments.json"; // Import assignments directly

export default function Assignments() {
  const { cid } = useParams(); // Get course ID from URL
  const filteredAssignments = assignments.filter((a) => a.course === cid); // Filter assignments

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

      {/* Assignments List */}
      <ListGroup>
        {filteredAssignments.map((assignment) => (
          <ListGroup.Item key={assignment._id} className="d-flex justify-content-between align-items-center">
            <div>
              <Link 
                to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`} 
                className="text-decoration-none fw-bold"
              >
                {assignment.title}  
              </Link>
            </div>
            <FaCheckCircle className="text-success" />
          </ListGroup.Item>
        ))}
      </ListGroup>
    </Container>
  );
}
