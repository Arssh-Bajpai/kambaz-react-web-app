

import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addCourse } from "./Courses/reducer";
import { Card, FormControl, Button } from "react-bootstrap";
//import EnrollmentButtonUpdated from "./Enrollments/EnrollmentButton";
import { useNavigate } from "react-router-dom";



export default function Dashboard({
  courses,
  //course,
  //setCourse,
  //addNewCourse,
  deleteCourse,
  updateCourse,
  enrolling, 
  setEnrolling, 
  updateEnrollment
}: {
  courses: any[];
  course: any;
  setCourse: React.Dispatch<any>;
  addNewCourse: () => void;
  deleteCourse: (courseId: any) => void;
  updateCourse: () => void;
  enrolling: boolean; setEnrolling: (enrolling: boolean) => void;
  updateEnrollment: (courseId: string, enrolled: boolean) => void;
}) {
  const dispatch = useDispatch();
  //const { courses } = useSelector((state: any) => state.courseReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  //const { enrollments = [] } = useSelector((state: any) => state.enrollmentsReducer);
  const isFacultyTrue = currentUser?.role === "Faculty";
  const isStudentTrue = currentUser?.role === "Student";
  const [courseName, setCourseName] = useState("");
  const navigate = useNavigate();

  const [showEnrollments, setShowEnrollments] = useState(false);
  
  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard
      <button onClick={() => setEnrolling(!enrolling)} className="float-end btn btn-primary" >
          {enrolling ? "My Courses" : "All Courses"}
        </button>
        </h1>
      <hr />
      {isFacultyTrue ? (
        <div className="mb-4">
          <FormControl
            className="mb-2"
            placeholder="New Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                addCourse({
                  _id: uuidv4(),  name: courseName,
                  image: "/default.jpg",
                  description: "New Course Description",
                })
              );
              setCourseName("");
            }}
          >
            + Add Course
          </Button>
        </div>
      ): null }

      {(isStudentTrue) ? (
        <Button  onClick={() => setShowEnrollments(!showEnrollments)}>
          Enrollments
        </Button>
      ): null }
      
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {courses.map((course: any) => (
          <div key={course._id} className="col" style={{ width: "300px" }}>
            <div className="card">
              {/* <Link
                to={
                  `/Kambaz/Courses/${course._id}/Home` 
                }
                className="wd-dashboard-course-link text-decoration-none text-dark"
              > */}
                <Card.Img src={course.image } variant="top" width="100%" height={160} 
                onClick={() => navigate(`/Kambaz/Courses/${course._id}/Home`)}
                />
                <Card.Body className="card-body">
                {enrolling && (
              <button onClick={(event) => {
                event.preventDefault();
                updateEnrollment(course._id, !course.enrolled);
              }}
              className={`btn ${ course.enrolled ? "btn-danger" : "btn-success" } float-end`} >
                {course.enrolled ? "Unenroll" : "Enroll"}
              </button>
            )}

                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden" onClick={() => navigate(`/Kambaz/Courses/${course._id}/Home`)}>
                    {course.name}
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description}
                  </Card.Text>

                  {/* {isStudentTrue ? (
                    <EnrollmentButtonUpdated courseId={course._id} isEnrolled={(course._id)} currentUser={currentUser} />
                  ): null} */}

                  {isFacultyTrue ? (
                    <>
                      <Button
                        variant="danger"
                        className="float-end"
                        id="wd-delete-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        className="me-2 float-end"
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          updateCourse();
                        }}
                      >
                        Edit
                      </Button>
                    </>
                  ): null}
                </Card.Body>
              {/* </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}