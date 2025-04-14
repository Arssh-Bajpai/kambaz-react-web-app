import { Card, Row, Col, Button, Form, FormControl } from "react-bootstrap";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  deleteCourse: (course: any) => void;
  updateCourse: () => void;
}) {
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  const [courseName, setCourseName] = useState("");

  return (
    <div id="wd-dashboard" className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      <hr />

      {/* Conditional Rendering for Faculty */}
      {isFaculty && (
        <FacultySection
          course={course}
          courseName={courseName}
          setCourseName={setCourseName}
          setCourse={setCourse}
          addNewCourse={addNewCourse}
          updateCourse={updateCourse}
        />
      )}

      {/* Published Courses Section */}
      <PublishedCourses courses={courses} deleteCourse={deleteCourse} setCourse={setCourse} />
    </div>
  );
}

// Faculty Section Component: Allows faculty to add, edit, and update courses
const FacultySection = ({
  course,
  courseName,
  setCourseName,
  setCourse,
  addNewCourse,
  updateCourse,
}: {
  course: any;
  courseName: string;
  setCourseName: React.Dispatch<React.SetStateAction<string>>;
  setCourse: (course: any) => void;
  addNewCourse: () => void;
  updateCourse: () => void;
}) => (
  <div className="faculty-section">
    <h5>Create New Course</h5>
    <FormControl
      className="mb-2"
      placeholder="Enter New Course Name"
      value={courseName}
      onChange={(e) => setCourseName(e.target.value)}
    />
    <Button
      variant="primary"
      className="mb-3"
      onClick={() => {
        setCourse({ ...course, name: courseName });
        addNewCourse();
        setCourseName("");
      }}
    >
      + Add Course
    </Button>
    <hr />
    <div className="update-course-section">
      <Button variant="warning" onClick={updateCourse}>
        Update
      </Button>
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
    </div>
  </div>
);

// Published Courses Component: Displays the list of published courses
const PublishedCourses = ({
  courses,
  deleteCourse,
  setCourse,
}: {
  courses: any[];
  deleteCourse: (courseId: string) => void;
  setCourse: (course: any) => void;
}) => (
  <div className="published-courses">
    <h2>Published Courses ({courses.length})</h2>
    <hr />
    <Row xs={1} md={5} className="g-4">
      {courses.map((course) => (
        <Col key={course._id} className="course-card-col">
          <CourseCard
            course={course}
            deleteCourse={deleteCourse}
            setCourse={setCourse}
          />
        </Col>
      ))}
    </Row>
  </div>
);

// Course Card Component: Displays individual course details
const CourseCard = ({
  course,
  deleteCourse,
  setCourse,
}: {
  course: any;
  deleteCourse: (courseId: string) => void;
  setCourse: (course: any) => void;
}) => (
  <Card className="course-card">
    <Link to={`/Kambaz/Courses/${course._id}/Home`} className="course-link text-decoration-none text-dark">
      <Card.Img src={course.image || "/images/ood.jpeg"} variant="top" width="100%" height={160} />
      <Card.Body>
        <Card.Title className="course-title">{course.name}</Card.Title>
        <Card.Text className="course-description">{course.description}</Card.Text>
        <Button variant="primary">Go</Button>

        <CourseActions
          course={course}
          deleteCourse={deleteCourse}
          setCourse={setCourse}
        />
      </Card.Body>
    </Link>
  </Card>
);

// Course Actions Component: Provides the edit and delete buttons for faculty
const CourseActions = ({
  course,
  deleteCourse,
  setCourse,
}: {
  course: any;
  deleteCourse: (courseId: string) => void;
  setCourse: (course: any) => void;
}) => (
  <>
    <button
      onClick={(e) => {
        e.preventDefault();
        deleteCourse(course._id);
      }}
      className="btn btn-danger float-end"
    >
      Delete
    </button>
    <button
      onClick={(e) => {
        e.preventDefault();
        setCourse(course);
      }}
      className="btn btn-warning me-2 float-end"
    >
      Edit
    </button>
  </>
);

