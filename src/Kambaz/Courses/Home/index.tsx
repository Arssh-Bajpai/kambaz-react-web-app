import Modules from "../Modules";
import CourseStatus from "./Status";
import "../../styles.css"; // Ensure your styles file is included

export default function Home() {
  return (
    <div id="wd-course-home" className="d-flex flex-wrap">
      {/* Main Modules Section - Takes most space */}
      <div className="flex-grow-1 me-3">
        <Modules />
      </div>

      {/* Course Status Section - Hides on smaller screens */}
      <div className="d-none d-xl-block wd-course-status">
        <CourseStatus />
      </div>
    </div>
  );
}
