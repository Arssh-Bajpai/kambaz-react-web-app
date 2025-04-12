// src/Kambaz/Dashboard.tsx
import { Card, Row, Col, Button } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

type DashboardProps = {
  courses: any[];
};

export default function Dashboard({ courses }: DashboardProps) {
  const currentUser = useSelector((state: any) => state?.accountReducer?.currentUser);

  if (!currentUser) {
    return <div>Loading user info...</div>;
  }

  const isFaculty = currentUser.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {isFaculty && (
        <>
          <h5>New Course</h5>
          {/* Your course management UI here */}
        </>
      )}
      {/* Render existing courses */}
      <Row>
        {courses.map((course) => (
          <Col key={course._id} sm={12} md={6} lg={4}>
            <Card className="mb-3">
              <Card.Body>
                <Card.Title>{course.name}</Card.Title>
                <Card.Text>{course.description}</Card.Text>
                <Link to={`/courses/${course._id}/home`}>
                  <Button variant="primary">Go to Course</Button>
                </Link>
              </Card.Body>
            </Card>
          </Col>
        ))}
      </Row>
    </div>
  );
}
