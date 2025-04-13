import { Card, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";
import type { RootState } from "../Kambaz/store"; // adjust the relative path as needed

interface DashboardProps {
  courses?: any[];
  course?: any;
  setCourse?: (course: any) => void;
  addNewCourse?: () => void;
  deleteCourse?: (course: any) => void;
  updateCourse?: () => void;
}

export default function Dashboard({
  courses = [],
  course = {},
  setCourse = () => {},
  addNewCourse = () => {},
  deleteCourse = () => {},
  updateCourse = () => {},
}: DashboardProps) {
  // Always call hooks at the top.
  // Here we properly access currentUser from state.account.
  const currentUser = useSelector((state: RootState) => state.account.currentUser);
  const [courseName, setCourseName] = useState("");

  // Even if no user is signed in, the hooks above are always called.
  if (!currentUser) {
    return (
      <div id="wd-dashboard">
        <h1 id="wd-dashboard-title">Dashboard</h1>
        <hr />
        <p>Please sign in to view your courses.</p>
      </div>
    );
  }

  const isFaculty = currentUser?.role === "FACULTY";

  return (
    <div id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {isFaculty && (
        <>
          <h5>New Course</h5>
          <FormControl
            className="mb-2"
            placeholder="New Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <Button
            variant="primary"
            className="mb-3"
            id="wd-add-new-course-click"
            onClick={() => {
              setCourse({ ...course, name: courseName });
              addNewCourse();
              setCourseName("");
            }}
          >
            + Add Course
          </Button>
          <hr />
          <button
            className="btn btn-warning float-end me-2"
            onClick={updateCourse}
            id="wd-update-course-click"
          >
            Update
          </button>
          <Form.Control
            value={course.name || ""}
            className="mb-2"
            onChange={(e) => setCourse({ ...course, name: e.target.value })}
          />
          <Form.Control
            as="textarea"
            value={course.description || ""}
            rows={3}
            onChange={(e) => setCourse({ ...course, description: e.target.value })}
          />
        </>
      )}

      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />
      <div id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((courseItem) => (
            <Col
              key={courseItem._id}
              className="wd-dashboard-course"
              style={{ width: "300px" }}
            >
              <Card>
                <Link
                  to={`/Kambaz/Courses/${courseItem._id}/Home`}
                  className="wd-dashboard-course-link text-decoration-none text-dark"
                >
                  <Card.Img
                    src={courseItem.image || "/images/ood.jpeg"}
                    variant="top"
                    width="100%"
                    height={160}
                  />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
                      {courseItem.name}
                    </Card.Title>
                    <Card.Text
                      className="wd-dashboard-course-description overflow-hidden"
                      style={{ height: "100px" }}
                    >
                      {courseItem.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
                {isFaculty && (
                  <Card.Body>
                    <button
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(courseItem._id);
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
                        setCourse(courseItem);
                      }}
                      className="btn btn-warning me-2 float-end"
                    >
                      Edit
                    </button>
                  </Card.Body>
                )}
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
