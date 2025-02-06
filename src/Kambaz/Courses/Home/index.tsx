import Modules from "../Modules";
import CourseStatus from "./Status";

export default function Home() {
  return (
    <div id="wd-course-home" className="d-flex">
      {/* Main Modules Section */}
      <div className="flex-grow-1 me-3">
        <Modules />
      </div>

      {/* Course Status Section */}
      <div className="d-none d-xl-block wd-course-status">
        <CourseStatus />
      </div>
    </div>
  );
}
