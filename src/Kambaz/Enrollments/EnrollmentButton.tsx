
// import { Button } from "react-bootstrap";
// import { useDispatch } from "react-redux";
// import { enroll, unenroll } from "./enrollmentsReducer";

// export default function EnrollmentButton({ courseId, isEnrolled, currentUser}: {courseId: string; isEnrolled: boolean; currentUser: { _id: string };
// }) {
//   const dispatch = useDispatch();
//   return (
//     <Button
//       variant={isEnrolled ? "danger" : "success"}
//       onClick={() => {
//         isEnrolled ? dispatch(unenroll({ user: currentUser._id, course: courseId }))
//           : dispatch(enroll({ user: currentUser._id, course: courseId }));
//       }}
//     >
//       {isEnrolled ? "Unenroll" : "Enroll"}
//     </Button>
//   );
// }

import { Button } from "react-bootstrap";
import * as enrollmentsClient from "../Enrollments/client";
import { useState } from "react";

export default function EnrollmentButtonUpdated({
  courseId, isEnrolled: initialEnrollment, currentUser, }: {courseId: string; isEnrolled: boolean; currentUser: { _id: string };

}) {
  const [isEnrolled, setIsEnrolled] = useState(initialEnrollment);
  const handle = async () => {
    if (isEnrolled) {
        await enrollmentsClient.unenrollUserFromCourse(currentUser._id, courseId);
      setIsEnrolled(false);
    } else {
        await enrollmentsClient.enrollUserInCourse(currentUser._id, courseId);
    setIsEnrolled(true);
      }
  };
  return (
    <Button variant={isEnrolled ? "danger" : "success"} onClick={handle}>
      {isEnrolled ? "Unenroll" : "Enroll"}
    </Button>
  );
}
