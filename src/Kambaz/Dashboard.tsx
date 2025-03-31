// Dashboard.tsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import * as db from "./Database";
import { Button, Card, Col, Row } from "react-bootstrap";

export default function Dashboard() {
  // Retrieve the current user from Redux
  const currentUser = useSelector((state: any) => state.account.currentUser);

  if (!currentUser) {
    return <div>Please sign in to see your courses.</div>;
  }

  // Memoize the courses data so we don't recreate the array on every render.
  const coursesWithEnrollment = useMemo(() => {
    return db.courses.map((course: any) => ({
      ...course,
      enrolledUsers: course.enrolledUsers || [],
    }));
  }, []);

  // Local state for enrollments: mapping course._id -> boolean
  const [enrollments, setEnrollments] = useState<{ [key: string]: boolean }>({});

  // Toggle to show either all courses or only enrolled courses
  const [showOnlyEnrolled, setShowOnlyEnrolled] = useState(false);

  // Initialize enrollments only once (or when currentUser changes)
  useEffect(() => {
    const initEnrollments: { [key: string]: boolean } = {};
    coursesWithEnrollment.forEach((course: any) => {
      // Ensure both values are strings for robust comparison
      initEnrollments[course._id] = course.enrolledUsers.includes(String(currentUser._id));
    });
    setEnrollments(initEnrollments);
  }, [currentUser, coursesWithEnrollment]);

  // Filter courses based on the toggle
  const displayedCourses = coursesWithEnrollment.filter((course: any) => {
    if (!showOnlyEnrolled) return true;
    return enrollments[course._id];
  });

  // Handlers for enroll/unenroll
  const handleEnroll = (courseId: string) => {
    setEnrollments(prev => ({ ...prev, [courseId]: true }));
  };

  const handleUnenroll = (courseId: string) => {
    setEnrollments(prev => ({ ...prev, [courseId]: false }));
  };

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">
          Published Courses ({displayedCourses.length})
        </h2>
        <Button variant="primary" onClick={() => setShowOnlyEnrolled(!showOnlyEnrolled)}>
          {showOnlyEnrolled ? "Show All Courses" : "Show Enrolled Courses"}
        </Button>
      </div>
      <hr />

      <div id="wd-dashboard-courses">
        {displayedCourses.length === 0 ? (
          <p>No courses found for your account.</p>
        ) : (
          <Row xs={1} md={5} className="g-4">
            {displayedCourses.map((course: any) => (
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
                    </Card.Body>
                  </Link>
                  <Card.Footer>
                    {enrollments[course._id] ? (
                      <Button variant="danger" size="sm" onClick={() => handleUnenroll(course._id)}>
                        Unenroll
                      </Button>
                    ) : (
                      <Button variant="success" size="sm" onClick={() => handleEnroll(course._id)}>
                        Enroll
                      </Button>
                    )}
                  </Card.Footer>
                </Card>
              </Col>
            ))}
          </Row>
        )}
      </div>
    </div>
  );
}
