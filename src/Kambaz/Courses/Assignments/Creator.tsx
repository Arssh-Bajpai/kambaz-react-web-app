// import { useEffect, useState } from "react";
// import { Button, Container, Form, Row, Col } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import * as assignmentClient from "./client";

// export default function AssignmentCreator() {
//   const { aid, cid } = useParams();
//   const navigate = useNavigate();

//   const [assignment, setAssignment] = useState<any>({
//     title: "",
//     description: "",
//     points: "100",
//     due: "",
//     available: "",
//     availableUntil: "",
//     course: cid,
//     module: "Multiple Modules",
//   });

//   const isCreateMode = aid === "new";

//   useEffect(() => {
//     const loadAssignment = async () => {
//       if (!isCreateMode && aid) {
//         const existing = await assignmentClient.findAssignment(aid);
//         setAssignment(existing);
//       }
//     };
//     loadAssignment();
//   }, [aid]);

//   const save = async () => {
//     // Associate assignment only with the module
//     const assignmentToSave = {
//       ...assignment,
//       course: undefined, // Remove course association if backend allows
//       module: assignment.module,
//     };

//     if (isCreateMode) {
//       await assignmentClient.createAssignmentForCourse(cid!, assignmentToSave);
//     } else {
//       await assignmentClient.updateAssignment({ ...assignment, module: assignment.module });
//     }
//     navigate(`/Kambaz/Courses/${cid}/Assignments`);
//   };

//   const updateField = (key: string) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) =>
//     setAssignment({ ...assignment, [key]: e.target.value });

//   return (
//     <Container>
//       <div id="wd-assignments-editor">
//         <Form.Label htmlFor="title">Assignment Name</Form.Label>
//         <Form.Control
//           className="mb-2"
//           id="title"
//           value={assignment.title}
//           onChange={updateField("title")}
//         />

//         <Form.Label htmlFor="description">Description</Form.Label>
//         <textarea
//           id="description"
//           className="w-100 mb-2"
//           value={assignment.description}
//           onChange={updateField("description")}
//         />

//         <Row className="mb-2">
//           <Col className="text-end">
//             <Form.Label className="wd-points">Points</Form.Label>
//           </Col>
//           <Col>
//             <Form.Control
//               id="points"
//               type="number"
//               value={assignment.points}
//               onChange={updateField("points")}
//             />
//           </Col>
//         </Row>

//         <div className="border p-3 rounded mb-2">
//           <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="due">Due Date</Form.Label>
//             </Col>
//             <Col>
//               <Form.Control
//                 id="due"
//                 type="date"
//                 value={assignment.due}
//                 onChange={updateField("due")}
//               />
//             </Col>
//           </Row>

//           <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="available">Available From</Form.Label>
//             </Col>
//             <Col>
//               <Form.Control
//                 id="available"
//                 type="date"
//                 value={assignment.available}
//                 onChange={updateField("available")}
//               />
//             </Col>
//             <Col className="text-end">
//               <Form.Label htmlFor="availableUntil">Available Until</Form.Label>
//             </Col>
//             <Col>
//               <Form.Control
//                 id="availableUntil"
//                 type="date"
//                 value={assignment.availableUntil}
//                 onChange={updateField("availableUntil")}
//               />
//             </Col>
//           </Row>
//         </div>

//         <div className="right-aligned-assignment-editor-buttons justify-content-end mt-2">
//           <Button size="lg" className="me-1 float-end" variant="danger" onClick={save}>
//             Save
//           </Button>
//           <Button
//             size="lg"
//             className="me-1 float-end"
//             variant="outline-secondary"
//             onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}
//           >
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </Container>
//   );
// }
