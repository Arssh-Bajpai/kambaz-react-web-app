// src/Kambaz/index.tsx
import { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";

import KambazNavigation from "./Navigation";
import Session from "./Account/Session";
import Account from "./Account";
import Dashboard from "./Dashboard";
import Courses from "./Courses";
import AssignmentEditor from "./Courses/Assignments/Editor";
import ProtectedRoute from "./Account/ProtectedRoute";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import * as enrollmentsClient from "./Enrollments/client";
import { setEnrollments } from "./Courses/People/reducer";

axios.defaults.withCredentials = true;

export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any | null>(null);
  const [enrolling, setEnrolling] = useState<boolean>(false);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const dispatch = useDispatch();

  const findCoursesForUser = async () => {
    try {
      const courses = await userClient.findCoursesForUser(currentUser._id);
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchCourses = async () => {
    try {
      const allCourses = await courseClient.fetchAllCourses();
      const enrolledCourses = await userClient.findCoursesForUser(currentUser._id);
      const courses = allCourses.map((course: any) => {
        const isEnrolled = enrolledCourses.find((c: any) => c._id === course._id);
        return { ...course, enrolled: !!isEnrolled };
      });
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };

  const updateEnrollment = async (courseId: string, enrolled: boolean) => {
    try {
      if (enrolled) {
        await userClient.enrollIntoCourse(currentUser._id, courseId);
      } else {
        await userClient.unenrollFromCourse(currentUser._id, courseId);
      }

      setCourses(
        courses.map((course) =>
          course._id === courseId ? { ...course, enrolled: enrolled } : course
        )
      );

      const userCourses = await enrollmentsClient.findCoursesForUser(currentUser._id);
      const formatted = userCourses.map((c: any) => ({
        user: currentUser._id,
        course: c._id,
      }));
      dispatch(setEnrollments(formatted));
    } catch (error) {
      console.error("Error updating enrollment:", error);
    }
  };

  useEffect(() => {
    if (!currentUser?._id) return;
    if (enrolling) {
      fetchCourses();
    } else {
      findCoursesForUser();
    }
  }, [currentUser, enrolling]);

  const addNewCourse = async (newCourse: any) => {
    try {
      const savedCourse = await courseClient.createCourse(newCourse);
      setCourses([...courses, savedCourse]);
    } catch (error) {
      console.error("Error adding course:", error);
    }
  };

  const deleteCourse = async (courseId: string) => {
    try {
      const status = await courseClient.deleteCourse(courseId);
      setCourses(courses.filter((course) => course._id !== courseId));
      return status;
    } catch (error) {
      console.error("Error deleting course:", error);
    }
  };

  const updateCourse = async (updatedCourse: any) => {
    if (!updatedCourse || !updatedCourse._id) {
      console.warn("No course selected to update.");
      return;
    }

    try {
      const updated = await courseClient.updateCourse(updatedCourse);
      setCourses(
        courses.map((c) => (c._id === updated._id ? updated : c))
      );
    } catch (error) {
      console.error("Error updating course:", error);
    }
  };

  return (
    <div id="wd-kambaz" className="d-flex">
      <Session>
        <div className="row">
          <div className="d-none d-md-block flex-column">
            <KambazNavigation />
          </div>
          <div className="col flex-grow">
            <div className="wd-main-content-offset p-3">
              <Routes>
                <Route path="/" element={<Navigate to="Account" />} />
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
                        enrolling={enrolling}
                        setEnrolling={setEnrolling}
                        updateEnrollment={updateEnrollment} // ✅ added here
                      />
                    </ProtectedRoute>
                  }
                />
                <Route
                  path="Courses/:cid/Assignments/new"
                  element={
                    <ProtectedRoute>
                      <AssignmentEditor />
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
                <Route path="/Calendar" element={<h1>Calendar</h1>} />
                <Route path="/Inbox" element={<h1>Inbox</h1>} />
              </Routes>
            </div>
          </div>
        </div>
      </Session>
    </div>
  );
}