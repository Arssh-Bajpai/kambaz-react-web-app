// src/Kambaz/index.tsx
import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import * as db from "./Database";
import Account from "./Account";
import { useState } from "react";
import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>(db.courses);
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const addNewCourse = () => {
    setCourses([...courses, { ...course, _id: uuidv4() }]);
  };

  const deleteCourse = (courseId: any) => {
    setCourses(courses.filter((c) => c._id !== courseId));
  };

  const updateCourse = () => {
    setCourses(
      courses.map((c) =>
        c._id === course._id ? course : c
      )
    );
  };

  // if there are no courses yet, don't try to redirect
  const firstId = courses.length > 0 ? courses[0]._id : "";

  return (
    <div id="wd-kambaz">
      <table width="100%">
        <tbody>
          <tr>
            <td valign="top">
              <KambazNavigation />
            </td>
            <td valign="top">
              <div className="wd-main-content-offset p-3">
                <Routes>
                  {/* default landing */}
                  <Route path="/" element={<Navigate to="Dashboard" />} />

                  {/* account */}
                  <Route path="/Account/*" element={<Account />} />

                  {/* dashboard */}
                  <Route
                    path="Dashboard"
                    element={
                      <ProtectedRoute>
                        <Dashboard
                          courses={courses}
                          course={course}
                          setCourse={setCourse}
                          addNewCourse={addNewCourse}
                          deleteCourse={deleteCourse}
                          updateCourse={updateCourse}
                        />
                      </ProtectedRoute>
                    }
                  />

                  {firstId && (
                    // redirect bare /Courses → a valid course + default tab “Home”
                    <Route
                      path="Courses"
                      element={
                        <Navigate to={`Courses/${firstId}/Home`} replace />
                      }
                    />
                  )}

                  {/* actual course pages */}
                  <Route
                    path="Courses/:cid/*"
                    element={
                      <ProtectedRoute>
                        <Courses courses={courses} />
                      </ProtectedRoute>
                    }
                  />
                </Routes>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}
