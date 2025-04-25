// import { Link } from "react-router-dom";
// import * as db from "./Database";
// import { Row, Col, Card, Button } from 'react-bootstrap'; 
// export default function Dashboard() {
//   const courses = db.courses;
//   return (
//     <div id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//       <div id="wd-dashboard-courses">
//         <Row xs={1} md={5} className="g-4">
//           {courses.map((course) => (
//             <Col className="wd-dashboard-course" style={{ width: "300px" }}>
//               <Card>
//                 <Link to={`/Kambaz/Courses/${course._id}/Home`}
//                       className="wd-dashboard-course-link text-decoration-none text-dark" >
//                   <Card.Img src={course.img} variant="top" width="100%" height={160} />
//                   <Card.Body className="card-body">
//                     <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                       {course.name} </Card.Title>
//                     <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                       {course.description} </Card.Text>
//                     <Button variant="primary"> Go </Button>
//                   </Card.Body>
//                 </Link>
//               </Card>
//             </Col>
//           ))}
//         </Row>
//       </div>
//     </div>);}











// // import { Link } from "react-router-dom";
// // import { Row, Col, Card, Button } from 'react-bootstrap'; 
// // export default function Dashboard() {
// //   return (

// //     <div id="wd-dashboard">
// //     <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
// //     <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
// //     <div id="wd-dashboard-courses">
// //       <Row xs={1} md={4} className="g-4 gy-4" >
// //         <Col className="wd-dashboard-course" style={{ width: "300px"}}>
// //           <Card>
// //             <Link to="/Kambaz/Courses/1234/Home"
// //                   className="wd-dashboard-course-link text-decoration-none text-dark">
// //               <Card.Img variant="top" src="/images/reactjpg.jpg" width="100%" height={160}/>
// //               <Card.Body>
// //                 <Card.Title className="wd-dashboard-course-title">CS1234 React JS</Card.Title>
// //                 <Card.Text  className="wd-dashboard-course-description">Full Stack software developer</Card.Text>
// //                 <Button variant="primary">Go</Button>
// //               </Card.Body>
// //             </Link>
// //           </Card>
// //         </Col>
// //         <Col className="wd-dashboard-course" style={{ width: "300px"}}> 
// //         <Card>
// //             <Link to="/Kambaz/Courses/1234/Home"
// //                   className="wd-dashboard-course-link text-decoration-none text-dark">
// //               <Card.Img variant="top" src="images/FINA2201.jpg" width="100%" height={160}/>
// //               <Card.Body>
// //                 <Card.Title className="wd-dashboard-course-title">FINA2201</Card.Title>
// //                 <Card.Text  className="wd-dashboard-course-description">Financial Accounting</Card.Text>
// //                 <Button variant="primary">Go</Button>
// //               </Card.Body>
// //             </Link>
// //           </Card>
// //         </Col>
// //         <Col className="wd-dashboard-course" style={{ width: "300px"}}>
// //         <Card>
// //             <Link to="/Kambaz/Courses/1234/Home"
// //                   className="wd-dashboard-course-link text-decoration-none text-dark">
// //               <Card.Img variant="top" src="images/CS2500.jpg" width="100%" height={160}/>
// //               <Card.Body>
// //                 <Card.Title className="wd-dashboard-course-title">CS2500</Card.Title>
// //                 <Card.Text  className="wd-dashboard-course-description">Fundamentals of Computer Science I</Card.Text>
// //                 <Button variant="primary">Go</Button>
// //               </Card.Body>
// //             </Link>
// //           </Card>
          
// //         </Col>
      

// //         <Col className="wd-dashboard-course" style={{ width: "300px"}}>
// //           <Card>
// //             <Link to="/Kambaz/Courses/1234/Home"
// //                   className="wd-dashboard-course-link text-decoration-none text-dark">
// //               <Card.Img variant="top" src="images/fina2202.jpg" width="100%" height={160}/>
// //               <Card.Body>
// //                 <Card.Title className="wd-dashboard-course-title">FINA2202</Card.Title>
// //                 <Card.Text  className="wd-dashboard-course-description">Managerial Accounting</Card.Text>
// //                 <Button variant="primary">Go</Button>
// //               </Card.Body>
// //             </Link>
// //           </Card>
// //         </Col>

// //         <Col className="wd-dashboard-course" style={{ width: "300px"}}>
// //           <Card>
// //             <Link to="/Kambaz/Courses/1234/Home"
// //                   className="wd-dashboard-course-link text-decoration-none text-dark">
// //               <Card.Img variant="top" src="images/CS1800.jpg" width="100%" height={160}/>
// //               <Card.Body>
// //                 <Card.Title className="wd-dashboard-course-title">CS1800</Card.Title>
// //                 <Card.Text  className="wd-dashboard-course-description">Discrete Math</Card.Text>
// //                 <Button variant="primary">Go</Button>
// //               </Card.Body>
// //             </Link>
// //           </Card>
// //         </Col>

// //         <Col className="wd-dashboard-course" style={{ width: "300px"}}>
// //           <Card>
// //             <Link to="/Kambaz/Courses/1234/Home"
// //                   className="wd-dashboard-course-link text-decoration-none text-dark">
// //               <Card.Img variant="top" src="images/CS2510.jpg" width="100%" height={160}/>
// //               <Card.Body>
// //                 <Card.Title className="wd-dashboard-course-title">CS2510</Card.Title>
// //                 <Card.Text  className="wd-dashboard-course-description">Fundamentals of Computer Science II</Card.Text>
// //                 <Button variant="primary">Go</Button>
// //               </Card.Body>
// //             </Link>
// //           </Card>
// //         </Col>

// //         <Col className="wd-dashboard-course" style={{ width: "300px"}}>
// //           <Card>
// //             <Link to="/Kambaz/Courses/1234/Home"
// //                   className="wd-dashboard-course-link text-decoration-none text-dark">
// //               <Card.Img variant="top" src="images/MKTG.jpg" width="100%" height={160}/>
// //               <Card.Body>
// //                 <Card.Title className="wd-dashboard-course-title">MKTG2201</Card.Title>
// //                 <Card.Text  className="wd-dashboard-course-description">Intro to Marketing</Card.Text>
// //                 <Button variant="primary">Go</Button>
// //               </Card.Body>
// //             </Link>
// //           </Card>
// //         </Col>
// //         </Row>


// //   </div></div>
  


// // );}




    
// // <div id="wd-dashboard">
// // <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
// // <h2 id="wd-dashboard-published">Published Courses (12)</h2> <hr />
// // <div id="wd-dashboard-courses">
// //   <div className="wd-dashboard-course">
// //     <Link to="/Kambaz/Courses/1234/Home"
// //           className="wd-dashboard-course-link" >
// //       <img src="/images/reactjs.jpg" width={200} />
// //       <div>
// //         <h5> CS1234 React JS </h5>
// //         <p className="wd-dashboard-course-title">
// //           Full Stack software developer  </p>
// //         <button> Go </button>
// //       </div>
// //     </Link>
// //   </div>
// //   <div className="wd-dashboard-course">
// //     <Link to="/Kambaz/Courses/1234/Home"
// //           className="wd-dashboard-course-link" >
// //       <img src="/images/FINA2201.jpg" width={200} />
// //       <div>
// //         <h5> FINA2201 </h5>
// //         <p className="wd-dashboard-course-title">
// //           Financial Accounting  </p>
// //         <button> Go </button>
// //       </div>
// //     </Link>
// //   </div>
// //   <div className="wd-dashboard-course">
// //     <Link to="/Kambaz/Courses/1234/Home"
// //           className="wd-dashboard-course-link" >
// //       <img src="/images/fina2202.jpg" width={200} />
// //       <div>
// //         <h5> FINA2202 </h5>
// //         <p className="wd-dashboard-course-title">
// //           Managerial Accounting </p>
// //         <button> Go </button>
// //       </div>
// //     </Link>
// //   </div>
// //   <div className="wd-dashboard-course">
// //     <Link to="/Kambaz/Courses/1234/Home"
// //           className="wd-dashboard-course-link" >
// //       <img src="/images/CS2500.jpg" width={200} />
// //       <div>
// //         <h5> CS2500 </h5>
// //         <p className="wd-dashboard-course-title">
// //           Fundamentals of Computer Science I  </p>
// //         <button> Go </button>
// //       </div>
// //     </Link>
// //   </div>
// //   <div className="wd-dashboard-course">
// //     <Link to="/Kambaz/Courses/1234/Home"
// //           className="wd-dashboard-course-link" >
// //       <img src="/images/CS2510.jpg" width={200} />
// //       <div>
// //         <h5> CS2510 </h5>
// //         <p className="wd-dashboard-course-title">
// //           Fundamentals of Computer Science II  </p>
// //         <button> Go </button>
// //       </div>
// //     </Link>
// //   </div>
// //   <div className="wd-dashboard-course">
// //     <Link to="/Kambaz/Courses/1234/Home"
// //           className="wd-dashboard-course-link" >
// //       <img src="/images/MKTG.jpg" width={200} />
// //       <div>
// //         <h5> MKTG2201 </h5>
// //         <p className="wd-dashboard-course-title">
// //           Intro to Marketing  </p>
// //         <button> Go </button>
// //       </div>
// //     </Link>
// //   </div>
// //   <div className="wd-dashboard-course">
// //     <Link to="/Kambaz/Courses/1234/Home"
// //           className="wd-dashboard-course-link" >
// //       <img src="/images/CS1800.jpg" width={200} />
// //       <div>
// //         <h5> CS1800 </h5>
// //         <p className="wd-dashboard-course-title">
// //           Discrete Mathematics  </p>
// //         <button> Go </button>
// //       </div>
// //     </Link>
// //   </div>
// //   <div className="wd-dashboard-course">
// //     <Link to="/Kambaz/Courses/1234/Home"
// //           className="wd-dashboard-course-link" >
// //       <img src="/images/UX.jpg" width={200} />
// //       <div>
// //         <h5> CS4973 </h5>
// //         <p className="wd-dashboard-course-title">
// //           User Experience Design  </p>
// //         <button> Go </button>
// //       </div>
// //     </Link>
// //   </div>
// // </div>
// // </div>

// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { Modal, Card, FormControl, Button } from "react-bootstrap";
// import * as db from "././Database";
// export default function Dashboard() {
  
//   const [courses, setCourses] = useState<any[]>(db.courses);
//   const deleteCourse = (courseId: string) => {
//     setCourses(courses.filter((course) => course._id !== courseId));
//   };
//   const updateCourse = () => {
//     setCourses(
//       courses.map((c) => {
//         if (c._id === course._id) {
//           return course;
//         } else {
//           return c;
//         }
//       })
//     );
//   };


//   const [course, setCourse] = useState<any>({
//     _id: "0", name: "New Course", number: "New Number",
//     startDate: "2023-09-10", endDate: "2023-12-15",
//     image: "/images/reactjs.jpg", description: "New Description"
//   });
//   const addNewCourse = () => {
//     const newCourse = { ...course, _id: uuidv4() };
//     setCourses([...courses, newCourse ]);
//   };

//   return (
//     <div className="p-4" id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h5>New Course
//           <button className="btn btn-primary float-end"
//                   id="wd-add-new-course-click"
//                   onClick={addNewCourse} > Add </button>
//                   <button className="btn btn-warning float-end me-2"
//                 onClick={updateCourse} id="wd-update-course-click">
//           Update
//         </button>
//       </h5>
//       <FormControl as="textarea" value={course.name} className="mb-2"
//              onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
//       <FormControl as="textarea" value={course.description} rows={3}
//              onChange={(e) => setCourse({ ...course, description: e.target.value }) } />

//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//       <div className="row" id="wd-dashboard-courses">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {courses.map((course) => (
//             <div key={course._id} className="col" style={{ width: "300px" }}>
//               <div className="card">
//               <Link to={`/Kambaz/Courses/${course._id}/Home`}
//                         className="wd-dashboard-course-link text-decoration-none text-dark" >
//                     <Card.Img src={course.img} variant="top" width="100%" height={160} />
//                     <Card.Body className="card-body">
//                       <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                         {course.name} </Card.Title>
//                       <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                         {course.description} </Card.Text>
//                       <Button variant="primary"> Go </Button>
//                       <button onClick={(event) => {
//                       event.preventDefault();
//                       deleteCourse(course._id);
//                     }} className="btn btn-danger float-end"
//                     id="wd-delete-course-click">
//                     Delete
//                   </button>
//                   <button id="wd-edit-course-click"
//   onClick={(event) => {
//     event.preventDefault();
//     setCourse(course);
//   }}
//   className="btn btn-warning me-2 float-end" >
//   Edit
// </button>


//                     </Card.Body>
//                   </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
// );}




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { Modal, Card, FormControl, Button } from "react-bootstrap";
// import * as db from "././Database";
// export default function Dashboard({ courses, course, setCourse, addNewCourse,
//   deleteCourse, updateCourse }: {
//   courses: any[]; course: any; setCourse: (course: any) => void;
//   addNewCourse: () => void; deleteCourse: (course: any) => void;
//   updateCourse: () => void; })
//    {
//     return (
//     <div className="p-4" id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h5>New Course
//           <button className="btn btn-primary float-end"
//                   id="wd-add-new-course-click"
//                   onClick={addNewCourse} > Add </button>
//                   <button className="btn btn-warning float-end me-2"
//                 onClick={updateCourse} id="wd-update-course-click">
//           Update
//         </button>
//       </h5>
//       <FormControl as="textarea" value={course.name} className="mb-2"
//              onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
//       <FormControl as="textarea" value={course.description} rows={3}
//              onChange={(e) => setCourse({ ...course, description: e.target.value }) } />

//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//       <div className="row" id="wd-dashboard-courses">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {courses.map((course) => (
//             <div key={course._id} className="col" style={{ width: "300px" }}>
//               <div className="card">
//               <Link to={`/Kambaz/Courses/${course._id}/Home`}
//                         className="wd-dashboard-course-link text-decoration-none text-dark" >
//                     <Card.Img src={course.img} variant="top" width="100%" height={160} />
//                     <Card.Body className="card-body">
//                       <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                         {course.name} </Card.Title>
//                       <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                         {course.description} </Card.Text>
//                       <Button variant="primary"> Go </Button>
//                       <button onClick={(event) => {
//                       event.preventDefault();
//                       deleteCourse(course._id);
//                     }} className="btn btn-danger float-end"
//                     id="wd-delete-course-click">
//                     Delete
//                   </button>
//                   <button id="wd-edit-course-click"
//   onClick={(event) => {
//     event.preventDefault();
//     setCourse(course);
//   }}
//   className="btn btn-warning me-2 float-end" >
//   Edit
// </button>


//                     </Card.Body>
//                   </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
// );}




// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { useSelector } from "react-redux";
// import * as db from "./Database";
// import { Modal, Card, FormControl, Button } from "react-bootstrap";
// export default function Dashboard({ courses, course, setCourse, addNewCourse,
//   deleteCourse, updateCourse }: {
//   courses: any[]; course: any; setCourse: (course: any) => void;
//   addNewCourse: () => void; deleteCourse: (course: any) => void;
//   updateCourse: () => void; })
//    {
//     const { currentUser } = useSelector((state: any) => state.accountReducer);
//     const { enrollments } = db;
//     return (
//     <div className="p-4" id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1> <hr />
//       <h5>New Course
//           <button className="btn btn-primary float-end"
//                   id="wd-add-new-course-click"
//                   onClick={addNewCourse} > Add </button>
//                   <button className="btn btn-warning float-end me-2"
//                 onClick={updateCourse} id="wd-update-course-click">
//           Update
//         </button>
//       </h5>
//       <FormControl as="textarea" value={course.name} className="mb-2"
//              onChange={(e) => setCourse({ ...course, name: e.target.value }) } />
//       <FormControl as="textarea" value={course.description} rows={3}
//              onChange={(e) => setCourse({ ...course, description: e.target.value }) } />

//       <h2 id="wd-dashboard-published">Published Courses ({courses.length})</h2> <hr />
//       <div className="row" id="wd-dashboard-courses">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
          
//           {
//             courses
//               .filter((course) =>
//                 enrollments.some(
//                   (enrollment) =>
//                     enrollment.user === currentUser._id &&
//                     enrollment.course === course._id
//                    ))
          
//           courses.map((course) => (
//             <div key={course._id} className="col" style={{ width: "300px" }}>
//               <div className="card">
//               <Link to={`/Kambaz/Courses/${course._id}/Home`}
//                         className="wd-dashboard-course-link text-decoration-none text-dark" >
//                     <Card.Img src={course.img} variant="top" width="100%" height={160} />
//                     <Card.Body className="card-body">
//                       <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                         {course.name} </Card.Title>
//                       <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
//                         {course.description} </Card.Text>
//                       <Button variant="primary"> Go </Button>
//                       <button onClick={(event) => {
//                       event.preventDefault();
//                       deleteCourse(course._id);
//                     }} className="btn btn-danger float-end"
//                     id="wd-delete-course-click">
//                     Delete
//                   </button>
//                   <button id="wd-edit-course-click"
//   onClick={(event) => {
//     event.preventDefault();
//     setCourse(course);
//   }}
//   className="btn btn-warning me-2 float-end" >
//   Edit
// </button>


//                     </Card.Body>
//                   </Link>
//               </div>
//             </div>
//           ))}
//         </div>
//       </div>
//     </div>
// );}

// import React from "react";
// import { Link } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import { useSelector } from "react-redux";
// import * as db from "./Database";
// import enrollments from "./Database/enrollments.json";
// import { Modal, Card, FormControl, Button } from "react-bootstrap";

// export default function Dashboard({
//   courses,
//   course,
//   setCourse,
//   addNewCourse,
//   deleteCourse,
//   updateCourse,
// }: {
//   courses: any[];
//   course: any;
//   setCourse: (course: any) => void;
//   addNewCourse: () => void;
//   deleteCourse: (course: any) => void;
//   updateCourse: (course: any) => void;
// }) {
//   const { currentUser } = useSelector((state: any) => state.accountReducer);
//   //const { enrollments } = db.en;
//   const isFacultyTrue = currentUser?.role === "Faculty";


//   return (
//     <div className="p-4" id="wd-dashboard">
//       <h1 id="wd-dashboard-title">Dashboard</h1>
//       <hr />
//       {isFacultyTrue ? (
//           <>
//     <h5>
//       New Course
//       <Button
//         className="btn btn-primary float-end"
//         id="wd-add-new-course-click"
//         onClick={addNewCourse}
//       >
//         Add
//       </Button>
//       <Button
//         className="btn btn-warning float-end me-2"
//         id="wd-update-course-click"
//         onClick={() => updateCourse(course)}
//       >
//         Update
//       </Button>
//     </h5>

//     {/* Input Fields (Only visible to Faculty) */}
//     <FormControl
//       type="text"
//       value={course.name}
//       className="mb-2"
//       onChange={(e) => setCourse({ ...course, name: e.target.value })}
//     />
//     <FormControl
//       as="textarea"
//       value={course.description}
//       rows={3}
//       onChange={(e) => setCourse({ ...course, description: e.target.value })}
//     />
//     <hr />
//   </>
// ): null }

//       <h2 id="wd-dashboard-published">
//         Published Courses ({courses.length})
//       </h2>
//       <hr />

//       <div className="row" id="wd-dashboard-courses">
//         <div className="row row-cols-1 row-cols-md-5 g-4">
//           {courses
//             .filter((course) =>
//               enrollments.some(
//                 (enrollment) =>
//                 enrollment.course === course._id &&
//                   enrollment.user === currentUser._id
//               )
//             )
//             .map((course) => (
//               <div key={course._id} className="col" style={{ width: "300px" }}>
//                 <div className="card">
//                   <Link
//                     to={`/Kambaz/Courses/${course._id}/Home`}
//                     className="wd-dashboard-course-link text-decoration-none text-dark"
//                   >
//                     <Card.Img
//                       src={course.image} 
//                       variant="top"
//                       width="100%"
//                       height={160}
//                     />
//                     <Card.Body className="card-body">
//                       <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden">
//                         {course.name}
//                       </Card.Title>
//                       <Card.Text
//                         className="wd-dashboard-course-description overflow-hidden"
//                         style={{ height: "100px" }}
//                       >
//                         {course.description}
//                       </Card.Text>
//                       <Button variant="primary"> Go </Button>
//                       {isFacultyTrue ? (
//                           <>
//                             <Button
//                               variant="danger"
//                               className="float-end"
//                               id="wd-delete-course-click"
//                               onClick={(event) => {
//                                 event.preventDefault();
//                                 deleteCourse(course._id);
//                               }}
//                             >
//                               Delete
//                             </Button>
//                             <Button
//                               variant="warning"
//                               className="me-2 float-end"
//                               id="wd-edit-course-click"
//                               onClick={(event) => {
//                                 event.preventDefault();
//                                 setCourse(course);
//                               }}
//                             >
//                               Edit
//                             </Button>
//                           </>
//                         ): null }

//                     </Card.Body>
//                   </Link>
//                 </div>
//               </div>
//             ))}
//         </div>
//       </div>
//     </div>
//   );
// }


import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
//import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { addCourse } from "./Courses/reducer";
import { Card, FormControl, Button } from "react-bootstrap";
import EnrollmentButtonUpdated from "./Enrollments/EnrollmentButton";
import { useNavigate } from "react-router-dom";



export default function Dashboard({
  courses,
  //course,
  //setCourse,
  //addNewCourse,
  deleteCourse,
  updateCourse,
}: {
  courses: any[];
  course: any;
  setCourse: React.Dispatch<any>;
  addNewCourse: () => void;
  deleteCourse: (courseId: any) => void;
  updateCourse: () => void;
}) {
  const dispatch = useDispatch();
  //const { courses } = useSelector((state: any) => state.courseReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const { enrollments = [] } = useSelector((state: any) => state.enrollmentsReducer);
  const isFacultyTrue = currentUser?.role === "Faculty";
  const isStudentTrue = currentUser?.role === "Student";
  const [courseName, setCourseName] = useState("");
  const navigate = useNavigate();

  const [showEnrollments, setShowEnrollments] = useState(false);
  
  const isEnrolledTrue = (courseId: string) =>
    enrollments.some((enrollment: any) => enrollment.user === currentUser._id && enrollment.course === courseId
    );
    const displayedCourses = isFacultyTrue ? courses : showEnrollments ? courses
    : courses.filter((course: any) => isEnrolledTrue(course._id));
  return (
    <div className="p-4" id="wd-dashboard">
      <h1 id="wd-dashboard-title">Dashboard</h1>
      <hr />
      {isFacultyTrue ? (
        <div className="mb-4">
          <FormControl
            className="mb-2"
            placeholder="New Course Name"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
          />
          <Button
            variant="primary"
            onClick={() => {
              dispatch(
                addCourse({
                  _id: uuidv4(),  name: courseName,
                  image: "/default.jpg",
                  description: "New Course Description",
                })
              );
              setCourseName("");
            }}
          >
            + Add Course
          </Button>
        </div>
      ): null }

      {(isStudentTrue) ? (
        <Button  onClick={() => setShowEnrollments(!showEnrollments)}>
          Enrollments
        </Button>
      ): null }
      
      <div className="row row-cols-1 row-cols-md-4 g-4">
        {displayedCourses.map((course: any) => (
          <div key={course._id} className="col" style={{ width: "300px" }}>
            <div className="card">
              {/* <Link
                to={
                  `/Kambaz/Courses/${course._id}/Home` 
                }
                className="wd-dashboard-course-link text-decoration-none text-dark"
              > */}
                <Card.Img src={course.image } variant="top" width="100%" height={160} 
                onClick={() => navigate(`/Kambaz/Courses/${course._id}/Home`)}
                />
                <Card.Body className="card-body">
                  <Card.Title className="wd-dashboard-course-title text-nowrap overflow-hidden" onClick={() => navigate(`/Kambaz/Courses/${course._id}/Home`)}>
                    {course.name}
                  </Card.Title>
                  <Card.Text className="wd-dashboard-course-description overflow-hidden" style={{ height: "100px" }}>
                    {course.description}
                  </Card.Text>

                  {isStudentTrue ? (
                    <EnrollmentButtonUpdated courseId={course._id} isEnrolled={(course._id)} currentUser={currentUser} />
                  ): null}

                  {isFacultyTrue ? (
                    <>
                      <Button
                        variant="danger"
                        className="float-end"
                        id="wd-delete-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          deleteCourse(course._id);
                        }}
                      >
                        Delete
                      </Button>
                      <Button
                        variant="warning"
                        className="me-2 float-end"
                        id="wd-edit-course-click"
                        onClick={(event) => {
                          event.preventDefault();
                          updateCourse();
                        }}
                      >
                        Edit
                      </Button>
                    </>
                  ): null}
                </Card.Body>
              {/* </Link> */}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}