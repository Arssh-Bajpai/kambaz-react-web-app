import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Card, FormControl, Button } from "react-bootstrap";
import { setEnrollments } from "./Courses/People/reducer";
import * as enrollmentsClient from "./Enrollments/client";
import EnrollmentButtonUpdated from "./Enrollments/EnrollmentButton";

export default function Dashboard({
  courses,
  course,
  setCourse,
  addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling,
  setEnrolling,
  updateEnrollment, // ✅ Added prop
}: {
  courses: any[];
  course: any;
  setCourse: React.Dispatch<any>;
  addNewCourse: (course: any) => void;
  deleteCourse: (courseId: any) => void;
  updateCourse: (course: any) => void;
  enrolling: boolean;
  setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void; // ✅ Added type
}) {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments = [] } = useSelector((state: any) => state.enrollmentsReducer);

  const isFaculty = currentUser?.role === "Faculty";
  const isStudent = currentUser?.role === "Student";

  const [editingCourse, setEditingCourse] = useState<any | null>(null);
  const [newCourse, setNewCourse] = useState({
    name: "",
    number: "",
    startDate: "",
    endDate: "",
    credits: 3,
    image: "/default.jpg",
    description: "",
  });

  const isEnrolled = (courseId: string) =>
    enrollments.some(
      (enroll: any) => enroll.user === currentUser._id && enroll.course === courseId
    );

  const displayedCourses = enrolling
    ? courses
    : courses.filter((c: any) => isEnrolled(c._id));

  const handleCreateCourse = async () => {
    await addNewCourse(newCourse);
    setNewCourse({
      name: "",
      number: "",
      startDate: "",
      endDate: "",
      credits: 3,
      image: "/default.jpg",
      description: "",
    });
  };

  useEffect(() => {
    const loadEnrollments = async () => {
      if (currentUser?.role === "Student") {
        const userCourses = await enrollmentsClient.findCoursesForUser(currentUser._id);
        const formatted = userCourses.map((c: any) => ({
          user: currentUser._id,
          course: c._id,
        }));
        dispatch(setEnrollments(formatted));
      }
    };
    loadEnrollments();
  }, [currentUser]);

  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">
        Dashboard
        {isStudent && (
          <Button
            className="float-end"
            onClick={() => setEnrolling(!enrolling)}
          >
            {enrolling ? "My Courses" : "All Courses"}
          </Button>
        )}
      </h1>
      <hr />

      {isFaculty && (
        <div className="mb-4 border rounded p-3 bg-light">
          <h4>Add New Course</h4>
          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={newCourse.name}
            onChange={(e) => setNewCourse({ ...newCourse, name: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="Course Number"
            value={newCourse.number}
            onChange={(e) => setNewCourse({ ...newCourse, number: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="Start Date (YYYY-MM-DD)"
            value={newCourse.startDate}
            onChange={(e) => setNewCourse({ ...newCourse, startDate: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="End Date (YYYY-MM-DD)"
            value={newCourse.endDate}
            onChange={(e) => setNewCourse({ ...newCourse, endDate: e.target.value })}
          />
          <FormControl
            className="mb-2"
            placeholder="Description"
            value={newCourse.description}
            onChange={(e) => setNewCourse({ ...newCourse, description: e.target.value })}
          />
          <Button variant="primary" onClick={handleCreateCourse}>
            + Add Course
          </Button>
        </div>
      )}

      <div className="row row-cols-1 row-cols-md-4 g-4">
        {displayedCourses.map((c: any) => (
          <div key={c._id} className="col" style={{ width: "300px" }}>
            <div className="card">
              <Card.Img
                src={c.image}
                variant="top"
                width="100%"
                height={160}
                onClick={() => navigate(`/Kambaz/Courses/${c._id}/Home`)}
              />
              <Card.Body className="card-body">
                <Card.Title
                  className="wd-dashboard-course-title text-nowrap overflow-hidden"
                  onClick={() => navigate(`/Kambaz/Courses/${c._id}/Home`)}
                >
                  {enrolling && isStudent && (
                    <Button
                      onClick={(event) => {
                        event.preventDefault();
                        updateEnrollment(c._id, !isEnrolled(c._id)); // ✅ use prop here
                      }}
                      className={`btn-sm float-end ${
                        isEnrolled(c._id) ? "btn-danger" : "btn-success"
                      }`}
                    >
                      {isEnrolled(c._id) ? "Unenroll" : "Enroll"}
                    </Button>
                  )}
                  {c.name}
                </Card.Title>
                <Card.Text
                  className="wd-dashboard-course-description overflow-hidden"
                  style={{ height: "100px" }}
                >
                  {c.description}
                </Card.Text>

                {isStudent && !enrolling && (
                  <EnrollmentButtonUpdated
                    courseId={c._id}
                    isEnrolled={isEnrolled(c._id)}
                    currentUser={currentUser}
                  />
                )}

                {isFaculty && (
                  <>
                    <Button
                      variant="danger"
                      className="float-end"
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCourse(c._id);
                      }}
                    >
                      Delete
                    </Button>
                    <Button
                      variant="warning"
                      className="me-2 float-end"
                      onClick={(event) => {
                        event.preventDefault();
                        setEditingCourse(c);
                      }}
                    >
                      Edit
                    </Button>
                  </>
                )}
              </Card.Body>
            </div>
          </div>
        ))}
      </div>

      {editingCourse && (
        <div className="mt-4 border rounded p-4 bg-light">
          <h4>Edit Course</h4>
          <FormControl
            className="mb-2"
            placeholder="Course Name"
            value={editingCourse.name}
            onChange={(e) =>
              setEditingCourse({ ...editingCourse, name: e.target.value })
            }
          />
          <FormControl
            className="mb-2"
            placeholder="Course Description"
            value={editingCourse.description}
            onChange={(e) =>
              setEditingCourse({
                ...editingCourse,
                description: e.target.value,
              })
            }
          />
          <Button
            variant="success"
            onClick={() => {
              updateCourse(editingCourse);
              setEditingCourse(null);
            }}
          >
            Save Changes
          </Button>
          <Button
            variant="secondary"
            className="ms-2"
            onClick={() => setEditingCourse(null)}
          >
            Cancel
          </Button>
        </div>
      )}
    </div>
  );
}