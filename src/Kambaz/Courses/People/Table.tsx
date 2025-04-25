
import { useParams } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import users from "../../Database/users.json";
import enrollments from "../../Database/enrollments.json";

import "../../styles.css"
export default function PeopleTable() {
  const { cid } = useParams();
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
  {users.filter((user) =>
      enrollments.some((enrollment) => enrollment.user === user._id && enrollment.course === cid)
    )
    .map((user: any) => (
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
    </div> );}


// import { Table } from "react-bootstrap";
// import { FaUserCircle } from "react-icons/fa";
// export default function PeopleTable() {
//  return (
//   <div id="wd-people-table">
//    <Table striped>
//     <thead>
//      <tr><th>Name</th><th>Login ID</th><th>Section</th><th>Role</th><th>Last Activity</th><th>Total Activity</th></tr>
//     </thead>
//     <tbody>
//      <tr><td className="wd-full-name text-nowrap">
//           <FaUserCircle className="me-2 fs-1 text-secondary" />
//           <span className="wd-first-name">Tony</span>{" "}
//           <span className="wd-last-name">Stark</span></td>
//       <td className="wd-login-id">001234561S</td>
//       <td className="wd-section">S101</td>
//       <td className="wd-role">STUDENT</td>
//       <td className="wd-last-activity">2020-10-01</td>
//       <td className="wd-total-activity">10:21:32</td></tr>
//           {/* Add at least 3 more users such as Bruce Wayne, Steve Rogers, and Natasha Romanoff */}

//         <tr><td className="wd-full-name text-nowrap">
//         <FaUserCircle className="me-2 fs-1 text-secondary" />
//         <span className="wd-first-name">Bruce</span>{" "}
//         <span className="wd-last-name">Wayne</span></td>
//         <td className="wd-login-id">0012345618</td>
//         <td className="wd-section">S101</td>
//         <td className="wd-role">STUDENT</td>
//         <td className="wd-last-activity">2020-10-03</td>
//         <td className="wd-total-activity">10:21:35</td></tr>

//         <tr><td className="wd-full-name text-nowrap">
//         <FaUserCircle className="me-2 fs-1 text-secondary" />
//         <span className="wd-first-name">Steve</span>{" "}
//         <span className="wd-last-name">Rogers</span></td>
//         <td className="wd-login-id">0012345617</td>
//         <td className="wd-section">S101</td>
//         <td className="wd-role">STUDENT</td>
//         <td className="wd-last-activity">2020-10-02</td>
//         <td className="wd-total-activity">10:24:35</td></tr>

//         <tr><td className="wd-full-name text-nowrap">
//         <FaUserCircle className="me-2 fs-1 text-secondary" />
//         <span className="wd-first-name">Natasha</span>{" "}
//         <span className="wd-last-name">Romanoff</span></td>
//         <td className="wd-login-id">0012345619</td>
//         <td className="wd-section">S101</td>
//         <td className="wd-role">STUDENT</td>
//         <td className="wd-last-activity">2020-10-06</td>
//         <td className="wd-total-activity">8:21:35</td></tr>


//     </tbody>
//    </Table>
//   </div> );}