import { Table } from "react-bootstrap";
import { FaUserCircle } from "react-icons/fa";

export default function PeopleTable() {
  return (
    <div>
      <h2>People</h2>
      <Table striped>
        <thead>
          <tr>
            <th>Name</th>
            <th>Role</th>
            <th>Email</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td><FaUserCircle className="me-2" /> Tony Stark</td>
            <td>Student</td>
            <td>tony@avengers.com</td>
          </tr>
          <tr>
            <td><FaUserCircle className="me-2" /> Bruce Wayne</td>
            <td>TA</td>
            <td>bruce@wayne.com</td>
          </tr>
          <tr>
            <td><FaUserCircle className="me-2" /> Natasha Romanoff</td>
            <td>Professor</td>
            <td>natasha@shield.com</td>
          </tr>
        </tbody>
      </Table>
    </div>
  );
}
