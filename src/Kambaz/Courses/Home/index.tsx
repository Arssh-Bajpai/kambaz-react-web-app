import Modules from "../Modules";
import CourseStatus from "./Status";
import CourseNavigation from "../Navigation";

export default function Home() {
  return (
    <div className="container-fluid">
      <div className="row">
        {/* Course Navigation Sidebar */}
        <div className="col-md-3 col-lg-2 d-none d-md-block">
          <CourseNavigation />
        </div>

        {/* Main Content (Modules) */}
        <div className="col-md-7 col-lg-8">
          <Modules />
        </div>

        {/* Course Status (Hidden on Small Screens) */}
        <div className="col-md-3 col-lg-2 d-none d-lg-block">
          <CourseStatus />
        </div>
      </div>
    </div>
  );
}
