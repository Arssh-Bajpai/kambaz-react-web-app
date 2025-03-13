import KambazNavigation from "./Navigation";
import { Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import * as db from "./Database";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";
import Account from "./Account";

// Define Course Type for Consistency
type Course = {
  _id: string;
  name: string;
  number: string;
  startDate: string;
  endDate: string;
  description: string;
};

export default function Kambaz() {
  // ✅ Ensure courses are initialized properly
  const [courses, setCourses] = useState<Course[]>(db.courses || []);

  // ✅ Define state for a new course
  const [course, setCourse] = useState<Course>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  // ✅ Function to add a new course
  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: uuidv4() }]);
  };

  // ✅ Function to delete a course
  const deleteCourse = (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  // ✅ Function to update an existing course
  const updateCourse = () => {
    setCourses(courses.map((c) => (c._id === course._id ? course : c)));
  };

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content-offset p-3">
      <Routes>
  <Route path="/" element={<Navigate to="Dashboard" />} />
  <Route path="Account/*"      element={<Account />} />
  <Route path="Dashboard"      element={<ProtectedRoute><Dashboard            /></ProtectedRoute> } />
  <Route path="Courses/:cid/*" element={<ProtectedRoute><Courses courses={courses} /></ProtectedRoute> } />
  <Route path="Calendar"       element={<h1>Calendar</h1>} />
  <Route path="Inbox"          element={<h1>Inbox</h1>} />
</Routes>

      </div>
    </div>
  );
}
