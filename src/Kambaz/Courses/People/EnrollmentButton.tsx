import { Button } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { enroll, unenroll } from "./reducer";

export default function EnrollmentButton({ courseId, isEnrolled, currentUser}: {courseId: string; isEnrolled: boolean; currentUser: { _id: string };
}) {
  const dispatch = useDispatch();
  return (
    <Button
      variant={isEnrolled ? "danger" : "success"}
      onClick={() => {
        isEnrolled ? dispatch(unenroll({ user: currentUser._id, course: courseId }))
          : dispatch(enroll({ user: currentUser._id, course: courseId }));
      }}
    >
      {isEnrolled ? "Unenroll" : "Enroll"}
    </Button>
  );
}