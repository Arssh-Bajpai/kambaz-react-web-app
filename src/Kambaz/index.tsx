import "./styles.css";
import { Routes, Route, Navigate } from "react-router";
import Dashboard from "./Dashboard";
import KambazNavigation from "./Navigation";
import Courses from "./Courses";
import Account from "./Account";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Account/ProtectedRoute";
import Session from "./Account/Session"; // Updated import with proper casing
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

  // Get the currentUser from the account reducer in Redux.
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  
  // Debugging: Log currentUser and courses whenever they change
  useEffect(() => {
    console.log("Current User:", currentUser);
  }, [currentUser]);

  useEffect(() => {
    console.log("Courses updated:", courses);
  }, [courses]);

  // Debug: Fetch courses only if user is loaded
  const fetchCourses = async () => {
    console.log("Fetching courses...");
    try {
      const fetchedCourses = await userClient.findMyCourses();
      console.log("Fetched courses:", fetchedCourses);
      setCourses(fetchedCourses);
    } catch (error) {
      console.error("Error fetching courses:", error);
    }
  };

  // Only fetch courses if the user is loaded
  useEffect(() => {
    if (currentUser) {
      fetchCourses();
    } else {
      console.log("No currentUser, skipping fetchCourses");
    }
  }, [currentUser]);

  // Debug: Add a new course and log the operation
  const addNewCourse = async () => {
    console.log("Adding new course...");
    try {
      const newCourse = await userClient.createCourse(course);
      console.log("New course created:", newCourse);
      setCourses([...courses, newCourse]);
    } catch (error) {
      console.error("Error creating course:", error);
    }
  };

  // Debug: Delete a course and log the operation
  const deleteCourse = async (courseId: string) => {
    console.log("Deleting course with ID:", courseId);
    try {
      const status = await courseClient.deleteCourse(courseId);
      console.log("Deleted course response:", status);
      setCourses(courses.filter((course) => course._id !== courseId));
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  // Debug: Update a course and log the operation
  const updateCourse = async () => {
    console.log("Updating course:", course);
    try {
      await courseClient.updateCourse(course);
      console.log("Course updated:", course);
      setCourses(courses.map((c) => (c._id === course._id ? course : c)));
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  console.log("Rendering Kambaz component with courses:", courses);

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
