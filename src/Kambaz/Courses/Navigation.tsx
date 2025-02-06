import { Link } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div id="wd-course-navigation" className="list-group fs-5 rounded-0 bg-white">
      <Link to="/Kambaz/Courses/1234/Home" className="list-group-item active border border-0">
        Home
      </Link>
      <Link to="/Kambaz/Courses/1234/Modules" className="list-group-item text-danger border border-0">
        Modules
      </Link>
      <Link to="/Kambaz/Courses/1234/Assignments" className="list-group-item text-danger border border-0">
        Assignments
      </Link>
      <Link to="/Kambaz/Courses/1234/Quizzes" className="list-group-item text-danger border border-0">
        Quizzes
      </Link>
      <Link to="/Kambaz/Courses/1234/People" className="list-group-item text-danger border border-0">
        People
      </Link>
    </div>
  );
}
