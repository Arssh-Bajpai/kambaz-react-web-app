import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
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
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Tony Stark</td>
            <td>001234561S</td>
            <td>S101</td>
            <td>STUDENT</td>
            <td>2024-02-06</td>
            <td>10:21:32</td>
          </tr>
          <tr>
            <td><FaUserCircle className="me-2 fs-1 text-secondary" /> Bruce Wayne</td>
            <td>001234562S</td>
            <td>S102</td>
            <td>STUDENT</td>
            <td>2024-02-05</td>
            <td>15:42:18</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
