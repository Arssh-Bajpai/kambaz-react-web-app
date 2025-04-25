import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import users from "../../Database/users.json";
import enrollments from "../../Database/enrollments.json";

import "../../styles.css";

export default function PeopleTable() {
  const { cid } = useParams();

  // Filter the users based on the course ID and enrollment data
  const filteredUsers = users.filter((user) =>
    enrollments.some((enrollment) => enrollment.user === user._id && enrollment.course === cid)
  );

  return (
    <div id="wd-people-table">
      <table className="border-spacing-2">
        <thead>
          <tr>
            <th className="border">Name</th>
            <th className="border">Login ID</th>
            <th className="border">Section</th>
            <th className="border">Role</th>
            <th className="border">Last Activity</th>
            <th className="border">Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {filteredUsers.map((user: any) => (
            <tr key={user._id} className="border">
              <td className="wd-full-name text-nowrap border">
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                <span className="wd-first-name">{user.firstName} </span>
                <span className="wd-last-name">{user.lastName}</span>
              </td>
              <td className="wd-login-id border">{user.loginId}</td>
              <td className="wd-section border">{user.section}</td>
              <td className="wd-role border">{user.role}</td>
              <td className="wd-last-activity border">{user.lastActivity}</td>
              <td className="wd-total-activity border">{user.totalActivity}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
