import { Button } from "react-bootstrap";
import * as enrollmentsClient from "../Enrollments/client";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { setEnrollments } from "../Courses/People/reducer";

export default function EnrollmentButtonUpdated({
  courseId,
  isEnrolled: initialEnrollment,
  currentUser,
}: {
  courseId: string;
  isEnrolled: boolean;
  currentUser: { _id: string };
}) {
  const [isEnrolled, setIsEnrolled] = useState(initialEnrollment);
  const dispatch = useDispatch();

  const handle = async () => {
    if (isEnrolled) {
      await enrollmentsClient.unenrollUserFromCourse(
        currentUser._id,
        courseId
      );
    } else {
      await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
    }

    setIsEnrolled(!isEnrolled);

    const userCourses = await enrollmentsClient.findCoursesForUser(
      currentUser._id
    );
    const updatedEnrollments = userCourses.map((c: any) => ({
      user: currentUser._id,
      course: c._id,
    }));
    dispatch(setEnrollments(updatedEnrollments));
  };

  return (
    <Button variant={isEnrolled ? "danger" : "success"} onClick={handle}>
      {isEnrolled ? "Unenroll" : "Enroll"}
    </Button>
  );
}