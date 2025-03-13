import { useState } from "react";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as db from "./Database";
import { Button, Card, Col, FormControl, Row } from "react-bootstrap";

// ✅ Define Course Type with Optional `image`
type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  department: string;
  credits: number;
  description: string;
  author?: string;
  image?: string; // ✅ Now optional
};

export default function Dashboard() {
  // ✅ Initialize courses, ensuring all have an image
  const [courses, setCourses] = useState<Course[]>(
    db.courses.map((course) => ({
      ...course,
      image: "image" in course ? course.image : "/images/default.jpg", // ✅ Provide default image if missing
    }))
  );

  const [course, setCourse] = useState<Course>({
    _id: "0",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    department: "General",
    credits: 3,
    description: "New Description",
    image: "/images/reactjs.jpg",
  });

  // ✅ Function to add a new course
  const addNewCourse = () => {
    const newCourse = { ...course, _id: uuidv4() };
    setCourses([...courses, newCourse]);
  };

  // ✅ Function to delete a course
  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  // ✅ Function to update a course
  const updateCourse = () => {
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />

      {/* ✅ Form for adding/updating a course */}
      <h5>
        New Course
        <button className="btn btn-primary float-end" id="wd-add-new-course-click" onClick={addNewCourse}>
          Add
        </button>
        <button className="btn btn-warning float-end me-2" id="wd-update-course-click" onClick={updateCourse}>
          Update
        </button>
      </h5>
      <br />

      <FormControl value={course.name} className="mb-2" onChange={(e) => setCourse({ ...course, name: e.target.value })} />

      <FormControl as="textarea" value={course.description} rows={3} onChange={(e) => setCourse({ ...course, description: e.target.value })} />

      <hr />

      {/* ✅ Display published courses */}
      <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2>
      <hr />

      <div className="row" id="wd-dashboard-courses">
        <Row xs={1} md={5} className="g-4">
          {courses.map((course) => (
            <Col key={course._id} className="col" style={{ width: "300px" }}>
              <Card>
                <Link to={`/Kambaz/Courses/${course._id}/Home`} className="wd-dashboard-course-link text-decoration-none text-dark">
                  {/* ✅ Assign a default image if missing */}
                  <Card.Img src={course.image ?? "/images/default.jpg"} variant="top" width="100%" height={160} />
                  <Card.Body>
                    <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">{course.name}</Card.Title>
                    <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                      {course.description}
                    </Card.Text>
                    <Button variant="primary">Go</Button>
                  </Card.Body>
                </Link>
                {/* ✅ Delete button for removing a course */}
                <Button
                  onClick={(event) => {
                    event.preventDefault();
                    deleteCourse(course._id);
                  }}
                  className="btn btn-danger float-end"
                  id="wd-delete-course-click"
                >
                  Delete
                </Button>
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
}
