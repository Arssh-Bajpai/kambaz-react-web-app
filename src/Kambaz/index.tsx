import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Account from "./Account";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session";
import * as userClient from "./Account/client";
import { useSelector } from "react-redux";
import * as courseClient from "./Courses/client";

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234",
    name: "New Course",
    number: "New Number",
    startDate: "2023-09-10",
    endDate: "2023-12-15",
    description: "New Description",
  });

  const { currentUser } = useSelector((state: any) => state.accountReducer);

  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  // ✅ Only fetch courses if user is loaded
  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    }
  }, [currentUser]);

  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([...courses, newCourse]);
  };

  const deleteCourse = async (courseId: string) => {
    setCourses(courses.filter((course) => course._id !== courseId));
  };

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => (c._id === course._id ? course : c))
    );
  };

  return (
    <Session>
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
                    <Route path="/" element={<Navigate to="Dashboard" />} />
                    <Route path="/Account/*" element={<Account />} />
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
    </Session>
  );
}