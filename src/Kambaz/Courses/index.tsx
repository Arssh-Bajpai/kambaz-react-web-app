import CourseNavigation from "./Navigation";
import Modules from "./Modules";
import Assignments from "./Assignments";
import AssignmentEditor from "./Assignments/Editor";
import PeopleTable from "./People/Table";

import { Navigate, Route, Routes } from "react-router";
import { Container, Row, Col } from "react-bootstrap"; // ✅ Use Bootstrap Grid

export default function Courses() {
  return (
    <Container className="mt-4">
      <h2>Course 1234</h2>
      <hr />
      <Row>
        {/* Sidebar Navigation */}
        <Col xs={3}>
          <CourseNavigation />
        </Col>

        {/* Main Content */}
        <Col xs={9}>
          <Routes>
            <Route path="/" element={<Navigate to="Home" />} />
            <Route path="Modules" element={<Modules />} />
            <Route path="Assignments" element={<Assignments />} />
            <Route path="Assignments/:aid" element={<AssignmentEditor />} />
            <Route path="People" element={<PeopleTable />} />
          </Routes>
        </Col>
      </Row>
    </Container>
  );
}
