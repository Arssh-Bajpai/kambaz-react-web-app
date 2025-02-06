import { Link } from "react-router-dom";

export default function CourseNavigation() {
  return (
    <div id="wd-courses-navigation" className="wd list-group fs-5 rounded-0">
      <Link to="Home" className="list-group-item active border border-0"> Home </Link>
      <Link to="Modules" className="list-group-item text-danger border border-0"> Modules </Link>
      <Link to="Assignments" className="list-group-item text-danger border border-0"> Assignments </Link>
      <Link to="People" className="list-group-item text-danger border border-0"> People </Link>
    </div>
  );
}
