// src/Kambaz/Dashboard.tsx
import { useState, useEffect, useMemo } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { Button, Card, Col, Row } from "react-bootstrap";
import { enrollCourse, unenrollCourse } from "./Courses/reducer";

export default function Dashboard() {
  // 1) Call Hooks at top level
  const dispatch = useDispatch();
  const currentUser = useSelector((state: any) => state.account.currentUser);
  const courses = useSelector((state: any) => state.courses.courses);

  // 2) Local state
  const [enrollments, setEnrollments] = useState<{ [key: string]: boolean }>({});
  const [showOnlyEnrolled, setShowOnlyEnrolled] = useState(false);

  // 3) Derive data from Redux state outside of any Hook
  //    Then use useMemo to transform it if needed
  const coursesWithEnrollment = useMemo(() => {
    return courses.map((course: any) => ({
      ...course,
      enrolledUsers: course.enrolledUsers || [],
    }));
  }, [courses]);

  // 4) useEffect at top level, not inside conditions
  useEffect(() => {
    if (!currentUser) return;
    const initEnrollments: { [key: string]: boolean } = {};
    coursesWithEnrollment.forEach((course: any) => {
      initEnrollments[course._id] = course.enrolledUsers.includes(String(currentUser._id));
    });
    setEnrollments(initEnrollments);
  }, [coursesWithEnrollment, currentUser]);

  // 5) If user not logged in, conditionally return early
  if (!currentUser) {
    return <div>Please sign in to see your courses.</div>;
  }

  // 6) Now do any further transformations
  const displayedCourses = coursesWithEnrollment.filter((course: any) => {
    return showOnlyEnrolled ? enrollments[course._id] : true;
  });

  // Handlers
  const handleEnroll = (courseId: string) => {
    setEnrollments((prev) => ({ ...prev, [courseId]: true }));
    dispatch(enrollCourse({ courseId, userId: String(currentUser._id) }));
  };

  const handleUnenroll = (courseId: string) => {
    setEnrollments((prev) => ({ ...prev, [courseId]: false }));
    dispatch(unenrollCourse({ courseId, userId: String(currentUser._id) }));
  };

  // 7) Render
  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      <div className="d-flex justify-content-between align-items-center">
        <h2 id="wd-dashboard-published">Published Courses ({displayedCourses.length})</h2>
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
              <Col key={course._id} style={{ width: "300px" }}>
                <Card>
                  <Link
                    to={`/Kambaz/Courses/${course._id}/Home`}
                    className="wd-dashboard-course-link text-decoration-none text-dark"
                  >
                    <Card.Img src="/images/reactjs.jpg" variant="top" width="100%" height={160} />
                    <Card.Body>
                      <Card.Title className="text-nowrap overflow-hidden">{course.name}</Card.Title>
                      <Card.Text style={{ height: "100px" }}>{course.description}</Card.Text>
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
