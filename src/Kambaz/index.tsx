
import KambazNavigation from "./Navigation";
import Session from "./Account/Session";
import Account from "./Account";
import { Routes, Route, Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Dashboard from "./Dashboard";
import Courses from "./Courses";
// import * as db from "./Database";
import * as userClient from "./Account/client";
import * as courseClient from "./Courses/client";
import { useState, useEffect } from "react";
//import { v4 as uuidv4 } from "uuid";
import ProtectedRoute from "./Account/ProtectedRoute";
import AssignmentEditor from "./Courses/Assignments/Editor";
import axios from "axios";

axios.defaults.withCredentials = true;



export default function Kambaz() {
  const [courses, setCourses] = useState<any[]>([]);
  const [course, setCourse] = useState<any>({
    _id: "1234", name: "New Course", number: "New Number",
    startDate: "2023-09-10", endDate: "2023-12-15", description: "New Description",
  });
  const addNewCourse = async () => {
    const newCourse = await userClient.createCourse(course);
    setCourses([ ...courses, newCourse ]);
  };

  const deleteCourse = async (courseId: string) => {
    //const status = await courseClient.deleteCourse(courseId);
    setCourses(courses.filter((course) => course._id !== courseId));
};

  const updateCourse = async () => {
    await courseClient.updateCourse(course);
    setCourses(
      courses.map((c) => {
        if (c._id === course._id) {
          return course;
        } else {
          return c;
        }
      })
    );
  };
  //const [assignments, setAssignments] = useState<any[]>([]);

  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const fetchCourses = async () => {
    try {
      const courses = await userClient.findMyCourses();
      
      setCourses(courses);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchCourses();
  }, [currentUser]);

  



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
              <Route path="Dashboard" element={<ProtectedRoute><Dashboard
              courses={courses}
              course={course}
              setCourse={setCourse}
              addNewCourse={addNewCourse}
              deleteCourse={deleteCourse}
              updateCourse={updateCourse}/></ProtectedRoute>
          } />
            <Route path="Courses/:cid/Assignments/new" element={ <ProtectedRoute> <AssignmentEditor 
            /> </ProtectedRoute>
            } />
              

            <Route path="Courses/:cid/*" element={<ProtectedRoute> <Courses courses={courses} /></ProtectedRoute>} />
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


