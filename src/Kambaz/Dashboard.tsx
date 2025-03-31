import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "./Database";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function Dashboard() {
  // Retrieve the current user from Redux
  const currentUser = useSelector((state: any) => state.account.currentUser);

  // If there's no user signed in, you could display a message or redirect:
  if (!currentUser) {
    return <div>Please sign in to see your courses.</div>;
  }

  // Filter the courses in which the current user is enrolled.
  // Adjust the property names to match your data. For example,
  // if `course.enrolledUsers` is an array of user IDs:
  const userCourses = db.courses.filter((course: any) =>
    course.enrolledUsers?.includes(currentUser._id)
  );

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <h2 id="wd-dashboard-published">
        Published Courses ({userCourses.length})
      </h2>
      <hr />

      <div id="wd-dashboard-courses">
        {userCourses.length === 0 ? (
          // If the user is not enrolled in any courses
          <p>No courses found for your account.</p>
        ) : (
          <Row xs={1} md={5} className="g-4">
            {userCourses.map((course: any) => (
              <Col
                key={course._id}
                className="wd-dashboard-course"
                style={{ width: "300px" }}
              >
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img
                      src="/images/reactjs.jpg"
                      variant="top"
                      width="100%"
                      height={160}
                    />
                    <Card.Body className="card-body">
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text
                        className="wd-dashboard-course-description overflow-hidden"
                        style={{ height: "100px" }}
                      >
                        {course.description}
                      </Card.Text>
                      <Button variant="primary">Go</Button>
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
