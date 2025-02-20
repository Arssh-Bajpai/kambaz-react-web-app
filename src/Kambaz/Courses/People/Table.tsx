import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";
import { useParams } from "react-router-dom";
import enrollments from "../../Database/enrollments.json"; // Import enrollments

export default function PeopleTable() {
  const { cid } = useParams(); // Get course ID from URL

  // Filter enrollments to get only users in the current course
  const enrolledUsers = enrollments.filter((enrollment) => enrollment.course === cid);

  return (
    <div id="wd-people-table">
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Login ID</th>
            <th>Section</th>
            <th>Role</th>
            <th>Last Activity</th>
            <th>Total Activity</th>
          </tr>
        </thead>
        <tbody>
          {enrolledUsers.map((user) => (
            <tr key={user._id}>
              <td>
                <FaUserCircle className="me-2 fs-1 text-secondary" />
                User {user.user} {/* Replace with actual user data if available */}
              </td>
              <td>{user.user}</td>
              <td>{user.course}</td>
              <td>STUDENT</td> {/* Default role since no role data exists */}
              <td>N/A</td> {/* Placeholder for last activity */}
              <td>N/A</td> {/* Placeholder for total activity */}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
