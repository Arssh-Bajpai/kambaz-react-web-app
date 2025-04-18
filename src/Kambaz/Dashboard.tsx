import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { Link } from "react-router-dom";
import * as db from "./Database";
import { useSelector } from "react-redux";

export default function Dashboard(
  { courses, course, setCourse, addNewCourse, deleteCourse, updateCourse }: {
    courses: any[];
    course: any;
    setCourse: (course: any) => void;
    addNewCourse: () => void;
    deleteCourse: (course: any) => void;
    updateCourse: () => void;
  }
) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const { enrollments } = db;

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course
            <button
              className="btn btn-primary float-end"
              id="wd-add-new-course-click"
              onClick={addNewCourse}
            >
              Add
            </button>
          </h5>
          <hr />
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
          <Form.Control
            value={course.name}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <Form.Control
            as="textarea"
            value={course.description}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      )}

      <h2 id="wd-dashboard-published">Users Courses</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses
            .filter((course) =>
              enrollments.some(
                (enrollment) =>
                  enrollment.user === currentUser._id &&
                  enrollment.course === course._id
              )
            )
            .map((course) => (
              <Col key={course._id} className="wd-dashboard-course" style={{ width: "300px" }}>
                <Card>
                  <Link to={`/Kambaz/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                    <Card.Img src={"/images/ood.jpeg"} variant="top" width="100%" height={160} />
                    <Card.Body>
                      <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                        {course.name}
                      </Card.Title>
                      <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                        {course.description}
                      </Card.Text>
                      <Button variant="primary">Go</Button>

                      {isFaculty && (
                        <>
                          <button
                            onClick={(event) => {
                              event.preventDefault();
                              deleteCourse(course._id);
                            }}
                            className="btn btn-danger float-end"
                            id="wd-delete-course-click"
                          >
                            Delete
                          </button>
                          <button
                            id="wd-edit-course-click"
                            onClick={(event) => {
                              event.preventDefault();
                              setCourse(course);
                            }}
                            className="btn btn-warning me-2 float-end"
                          >
                            Edit
                          </button>
                        </>
                      )}
                    </Card.Body>
                  </Link>
                </Card>
              </Col>
            ))}
        </Row>
      </div>
    </div>
  );
}