import { Link } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div id="wd-course-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="/Kambaz/Courses/1234/Home" className="list-group-item active">
        Home
      </Link>
      <Link to="/Kambaz/Courses/1234/Modules" className="list-group-item">
        Modules
      </Link>
      <Link to="/Kambaz/Courses/1234/Piazza" className="list-group-item">
        Piazza
      </Link>
      <Link to="/Kambaz/Courses/1234/Zoom" className="list-group-item">
        Zoom Meetings
      </Link>
      <Link to="/Kambaz/Courses/1234/Assignments" className="list-group-item">
        Assignments
      </Link>
      <Link to="/Kambaz/Courses/1234/Quizzes" className="list-group-item">
        Quizzes
      </Link>
      <Link to="/Kambaz/Courses/1234/People" className="list-group-item">
        People
      </Link>
    </div>
  );
}
