
import { BsGripVertical } from "react-icons/bs"
import AssignmentControlButtons from "./AssignmentControlButtons"
import { Button } from "react-bootstrap";
import AssignmentControl from "./AssignmentControls"
import { CiSearch } from "react-icons/ci";
//import * as db from "../../Database";
import { Link, useParams, useNavigate } from "react-router-dom";
import "./style.css"
import * as assignmentClient from "./client.ts"; 
import { useEffect, useState } from "react";
import { FaTrash } from "react-icons/fa";
import { ListGroup } from "react-bootstrap";



export default function Assignments() {
    const { cid } = useParams();
    const n = useNavigate();
    const [assignments, setAssignments] = useState<any[]>([]);
    //const [assignmentName, setAssignmentName] = useState("");
    // const [courseAssignments, setCourseAssignments] = useState<any[]>([]);


    // useEffect(() => {
    //   const fetchAssignments = async () => {
    //     const courses = await assignmentClient.findAssignmentsForCourse(cid!);
    //     setAssignments(courses);
    //   };
    //   fetchAssignments();
    // }, [cid]);

    useEffect(() => {
      const fetchAssignments = async () => {
        try {
          const courses = await assignmentClient.findAssignmentsForCourse(cid!);
          if (Array.isArray(courses)) {
            setAssignments(courses);
          } else {
            console.error("Expected an array but got:", courses);
            setAssignments([]);
          }
        } catch (err) {
          console.error("Failed to fetch assignments:", err);
          setAssignments([]); 
        }
      };
      fetchAssignments();
    }, [cid]);
    
    
    const deleteAssignment = async (assignmentId: string) => {
      if (window.confirm("Are you sure you'd like to delete?")) {
        await assignmentClient.deleteAssignment(assignmentId);
        setAssignments(assignments.filter((a) => a._id !== assignmentId));
      }
    };

 


  return (
  <div id="wd-assignments" className="container">
  
  <div id="search-buttons-top" className="d-flex justify-content-between align-items-center gap-2">
  
          <div className="search-assignment justify-content-start">
                <CiSearch />
                <input
                  placeholder="Search for Assignments"
                  id="wd-search-assignment"
                  className="search-input"
                />
              </div>
          <div className = "right-aligned-buttons justify-content-end">
          <Button size="lg" className="me-1 float-end" id="wd-add-assignment-group" variant="outline-secondary">
          + Group
          </Button>
          <Button size="lg" className="me-1 float-end" id="wd-add-assignment" variant="danger" onClick={() => n(`/Kambaz/Courses/${cid}/Assignments/new`)}>
          + Assignment
          </Button>
          </div>
      </div>


      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" /> Assignments
            <span id="wd-assignments-percentage" className="border rounded-pill px-3 py-1 text-muted ms-auto">
              40% of Total
            </span>
            <AssignmentControl />
          </div>
          <ListGroup className="wd-lessons rounded-0 assignment-item">
            
          {Array.isArray(assignments) && assignments.map((assignment) => (

 
                <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1">
                  <BsGripVertical className="me-2 fs-3" />
                  <Link
                    to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
                    className="wd-assignment-link fw-bold"
                  >
                    {assignment.title}
                  </Link>
                  <div className="d-flex align-items-center justify-content-between">
                    <span className="text-muted">
                      <span className="text-danger">{assignment.module}</span> | <b>Not available until </b>
                      {assignment.available} | <b> Due</b> {assignment.due} | {assignment.points} pts
                    </span>
                 
                    <Button variant="danger" onClick={() => deleteAssignment(assignment._id)}>
                  <FaTrash />
                  </Button>
                    <AssignmentControlButtons
                    />
                  </div>
                </ListGroup.Item>
              ))
              }
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  
  
  )}





















// //import ModulesControls from "./Modules/ModulesControls"
// import { BsGripVertical } from "react-icons/bs"
// import AssignmentControlButtons from "./AssignmentControlButtons"
// import { Button } from "react-bootstrap";
// import AssignmentControl from "./AssignmentControl"
// import { CiSearch } from "react-icons/ci";
// import * as db from "../../Database";
// import { Link, useParams, useNavigate } from "react-router-dom";
// import "./style.css"
// //import { v4 as uuidv4 } from "uuid";
// import { useState } from "react";
// import { FaTrash } from "react-icons/fa";



// //import ModuleControlButtons from "../../Modules/ModuleControlButtons";

// import { ListGroup } from "react-bootstrap";


// export default function Assignments() {
//     const { cid } = useParams();
//     const n = useNavigate();
//     const [assignments, setAssignments] = useState<any[]>(db.assignments);
//     //const [assignmentName, setAssignmentName] = useState("");
//     const courseAssignments = assignments.filter((assignment) => assignment.course === cid);



//     // const addAssignment = () => {
//     //   const newAssignment = {
//     //     _id: uuidv4(), title: assignmentName, course: cid, module: "", available: "Jan 31st",
//     //     due: "Feb 7th",
//     //     points: "100",
//     //     description: "",
//     //   };
//     //   setAssignments([...assignments, newAssignment]); 
//     //   setAssignmentName("");
//     // };

//     const deleteAssignment = (assignmentId: string) => {
//       if (window.confirm("Are you sure you'd like to delete?")) {
//         setAssignments(assignments.filter((a) => a._id !== assignmentId));}
//     };

 
//     // const editAssignment = (assignmentId: string) => {
//     //   setAssignments(assignments.map((a) => (a._id === assignmentId ? { ...a, editing: true } : a)));
//     // };
    
//     // const updateAssignment = (updatedAssignment: any) => {
//     //   setAssignments(assignments.map((a) => (a._id === updatedAssignment._id ? updatedAssignment : a)));
//     // };
    
    

//   return (
//   <div id="wd-assignments" className="container">
  
//   <div id="search-buttons-top" className="d-flex justify-content-between align-items-center gap-2">
  
//           <div className="search-assignment justify-content-start">
//                 <CiSearch />
//                 <input
//                   placeholder="Search for Assignments"
//                   id="wd-search-assignment"
//                   className="search-input"
//                 />
//               </div>
//           <div className = "right-aligned-buttons justify-content-end">
//           <Button size="lg" className="me-1 float-end" id="wd-add-assignment-group" variant="outline-secondary">
//           + Group
//           </Button>
//           <Button size="lg" className="me-1 float-end" id="wd-add-assignment" variant="danger" onClick={() => n(`/Kambaz/Courses/${cid}/Assignments/new`)}>
//           + Assignment
//           </Button>
//           </div>
//       </div>


//       <ListGroup className="rounded-0" id="wd-modules">
//         <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//           <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
//             <BsGripVertical className="me-2 fs-3" /> Assignments
//             <span id="wd-assignments-percentage" className="border rounded-pill px-3 py-1 text-muted ms-auto">
//               40% of Total
//             </span>
//             <AssignmentControl />
//           </div>
//           <ListGroup className="wd-lessons rounded-0 assignment-item">
//               {courseAssignments.map((assignment) => (
//                 <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1">
//                   <BsGripVertical className="me-2 fs-3" />
//                   <Link
//                     to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
//                     className="wd-assignment-link fw-bold"
//                   >
//                     {assignment.title}
//                   </Link>
//                   <div className="d-flex align-items-center justify-content-between">
//                     <span className="text-muted">
//                       <span className="text-danger">{assignment.module}</span> | <b>Not available until </b>
//                       {assignment.available} | <b> Due</b> {assignment.due} | {assignment.points} pts
//                     </span>
                 
//                     <Button variant="danger" onClick={() => deleteAssignment(assignment._id)}>
//                   <FaTrash />
//                   </Button>
//                     <AssignmentControlButtons
//                     />
//                   </div>
//                 </ListGroup.Item>
//               ))
//               }
//           </ListGroup>
//         </ListGroup.Item>
//       </ListGroup>
//     </div>
  
  
//   )}
  














// //import ModulesControls from "./Modules/ModulesControls"
// import { BsGripVertical } from "react-icons/bs"
// import AssignmentControlButtons from "./AssignmentControlButtons"
// import { Button } from "react-bootstrap";
// import AssignmentControl from "./AssignmentControl"
// import { CiSearch } from "react-icons/ci";
// import * as db from "../../Database";
// import { Link, useParams } from "react-router-dom";
// import "./style.css"
// //import ModuleControlButtons from "../../Modules/ModuleControlButtons";

// import { ListGroup } from "react-bootstrap";


// export default function Assignments() {
//     const { cid } = useParams();
//     const assignments = db.assignments;
//     const courseAssignments = assignments.filter((assignment) => assignment.course === cid);


//   return (
//   <div id="wd-assignments" className="container">
  
//   <div id="search-buttons-top" className="d-flex justify-content-between align-items-center gap-2">
  
//           <div className="search-assignment justify-content-start">
//                 <CiSearch />
//                 <input
//                   placeholder="Search for Assignments"
//                   id="wd-search-assignment"
//                   className="search-input"
//                 />
//               </div>
//           <div className = "right-aligned-buttons justify-content-end">
//           <Button size="lg" className="me-1 float-end" id="wd-add-assignment-group" variant="outline-secondary">
//           + Group
//           </Button>
//           <Button size="lg" className="me-1 float-end" id="wd-add-assignment" variant="danger">
//           + Assignment
//           </Button>
//           </div>
//       </div>


//       <ListGroup className="rounded-0" id="wd-modules">
//         <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//           <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
//             <BsGripVertical className="me-2 fs-3" /> Assignments
//             <span id="wd-assignments-percentage" className="border rounded-pill px-3 py-1 text-muted ms-auto">
//               40% of Total
//             </span>
//             <AssignmentControl />
//           </div>
//           <ListGroup className="wd-lessons rounded-0 assignment-item">
//               {courseAssignments.map((assignment) => (
//                 <ListGroup.Item key={assignment._id} className="wd-lesson p-3 ps-1">
//                   <BsGripVertical className="me-2 fs-3" />
//                   <Link
//                     to={`/Kambaz/Courses/${cid}/Assignments/${assignment._id}`}
//                     className="wd-assignment-link fw-bold"
//                   >
//                     {assignment.title}
//                   </Link>
//                   <div className="d-flex align-items-center justify-content-between">
//                     <span className="text-muted">
//                       <span className="text-danger">{assignment.module}</span> | <b>Not available until </b>
//                       {assignment.available} | <b> Due</b> {assignment.due} | {assignment.points} pts
//                     </span>
//                     <AssignmentControlButtons />
//                   </div>
//                 </ListGroup.Item>
//               ))
//               }
//           </ListGroup>
//         </ListGroup.Item>
//       </ListGroup>
//     </div>
  
  
//   )}
  


// export default function Assignments() {
// return (
// <div id="wd-assignments" className="container">

// <div id="search-buttons-top" className="d-flex justify-content-between align-items-center gap-2">

//         <div className="search-assignment justify-content-start">
//               <CiSearch />
//               <input
//                 placeholder="Search for Assignments"
//                 id="wd-search-assignment"
//                 className="search-input"
//               />
//             </div>
//         <div className = "right-aligned-buttons justify-content-end">
//         <Button size="lg" className="me-1 float-end" id="wd-add-assignment-group" variant="outline-secondary">
//         + Group
//         </Button>
//         <Button size="lg" className="me-1 float-end" id="wd-add-assignment" variant="danger">
//         + Assignment
//         </Button>
//         </div>
//     </div>


//   {/* <AssignmentControl /><br /><br /><br /> */}
//   <ListGroup className="rounded-0" id="wd-modules">
//     <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//       <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
//         <BsGripVertical className="me-2 fs-3" /> Assignments 
//         <span id="wd-assignments-percentage" className="border rounded-pill px-3 py-1 text-muted ms-auto">
//           40% of Total
//         </span>
//         <AssignmentControl />
//       </div>
//       <ListGroup className="wd-lessons rounded-0 assignment-item">
        
//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//           <BsGripVertical className="me-2 fs-3" />
//           <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link fw-bold">
//       A1 - ENV + HTML
//       </a>
//       <div className="d-flex align-items-center justify-content-between">
//     <span className="text-muted">
//       Multiple Modules | <b>Not available until </b>May 6th at 12:00am | 
//       <b> Due</b> May 13th at 11:59pm | 100 pts
//     </span>

//   <AssignmentControlButtons />
// </div>

      
//         </ListGroup.Item>
        

//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//           <BsGripVertical className="me-2 fs-3" /> <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link fw-bold">
//       A2 - CSS
//       </a>
//       <div className="d-flex align-items-center justify-content-between">
//       <span className="text-muted">
//         Multiple Modules | <b>Not available until </b>May 6th at 12:00am | 
//         <b> Due</b> May 20th at 11:59pm | 100 pts
//       </span>

//   <AssignmentControlButtons />
// </div>




//         </ListGroup.Item>







//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" /><a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link fw-bold">
//       A3 - JAVASCRIPT
//       </a>
//       <div className="d-flex align-items-center justify-content-between">
//       <span className="text-muted">
//         Multiple Modules | <b>Not available until </b>May 6th at 12:00am | 
//         <b> Due</b> May 27th at 11:59pm | 100 pts
//       </span>

//   <AssignmentControlButtons />
// </div>
      
      
//       </ListGroup.Item>
//       </ListGroup>
//     </ListGroup.Item>
//   </ListGroup>
// </div>


// )}














// export default function Assignments() {
//     return (
//       <div id="wd-assignments" className="container">
//         <input placeholder="Search for Assignments"
//                id="wd-search-assignment" />
//         <button id="wd-add-assignment-group">+ Group</button>
//         <button id="wd-add-assignment">+ Assignment</button>
//         <h3 id="wd-assignments-title">
//           ASSIGNMENTS 40% of Total <button>+</button> </h3>




//         <ListGroup id="wd-assignment-list">

//         <ListGroup.Item className="wd-assignments-module p-0 mb-5 fs-5 border-gray">
//       <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link fw-bold">
//       A1 - ENV + HTML
//       </a>
//       <p className="text-muted mb-0">
//       <p>Multiple Modules | <b>Not available until </b>May 6th at 12:00am | 
//             <b> Due</b> May 13th at 11:59pm | 100 pts</p>
//       </p>
//       <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link fw-bold">
//       A2 - CSS + BOOTSTRAP
//       </a>
//       <p className="text-muted mb-0">
//       <p>Multiple Modules | <b>Not available until </b>May 13th at 12:00am | 
//             <b> Due</b> May 20th at 11:59pm | 100 pts</p>
//       </p>
//       <a href="#/Kambaz/Courses/1234/Assignments/123" className="wd-assignment-link fw-bold">
//         A3 - JAVASCRIPT + REACT
//       </a>
//       <p className="text-muted mb-0">
//         Multiple Modules | <b>Not available until</b> May 20th at 12:00am |
//         <b> Due</b> May 27th at 11:59pm | 100 pts
//       </p>
//     </ListGroup.Item>



//   </ListGroup>
//       </div>
//   );}


  // <ul id="wd-assignment-list">
  //         <li className="wd-assignment-list-item">
  //           <a href="#/Kambaz/Courses/1234/Assignments/123"
  //              className="wd-assignment-link" >
  //             A1 - ENV + HTML
  //           </a> 
  //           <p>Multiple Modules | <b>Not available until </b>May 6th at 12:00am | 
  //           <b> Due</b> May 13th at 11:59pm | 100 pts</p>
  //           </li>


  //           <li className="wd-assignment-list-item">
  //           <a href="#/Kambaz/Courses/1234/Assignments/123"
  //              className="wd-assignment-link" >
  //             A2 - CSS + BOOTSTRAP
  //           </a> 
  //           <p>Multiple Modules | <b>Not available until </b>May 13th at 12:00am | 
  //           <b> Due</b> May 20th at 11:59pm | 100 pts</p>
  //           </li>
            

  //           <li className="wd-assignment-list-item">
  //           <a href="#/Kambaz/Courses/1234/Assignments/123"
  //              className="wd-assignment-link" >
  //             A3 - JAVASCRIPT + REACT
  //           </a> 
  //           <p>Multiple Modules | <b>Not available until </b>May 20th at 12:00am | 
  //           <b> Due</b> May 27th at 11:59pm | 100 pts</p>
  //           </li>

  //       </ul>

  // <div>
  // <ModulesControls /><br /><br /><br />
  // <ListGroup className="rounded-0" id="wd-wd-assignments">
  //   <ListGroup.Item className="wd-assignments-module p-0 mb-5 fs-5 border-gray">
  //     <div className="wd-title p-3 ps-2 bg-secondary">
  //       <BsGripVertical className="me-2 fs-3" /> Assignments <ModuleControlButtons />
  //     </div>
  //     <ListGroup className="wd-assignments rounded-0">
  //       <ListGroup.Item className="wd-assignment p-3 ps-1">
  //         <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
  //       </ListGroup.Item>
  //       <ListGroup.Item className="wd-assignment p-3 ps-1">
  //         <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
  //       </ListGroup.Item>
  //       <ListGroup.Item className="wd-assignment p-3 ps-1">
  //         Learn what is Web Development </ListGroup.Item>
  //     </ListGroup>
  //   </ListGroup.Item>
  //   <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
  //     <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
  //     <ListGroup className="wd-assignments rounded-0">
  //       <ListGroup.Item className="wd-assignment p-3 ps-1">
  //         LESSON 1 </ListGroup.Item>
  //       <ListGroup.Item className="wd-assignment p-3 ps-1">
  //         LESSON 2 </ListGroup.Item>
  //     </ListGroup>
  //   </ListGroup.Item>


// </div>
  