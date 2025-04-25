import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();

  //uuidv4
  const [assignment, setAssignment] = useState<any>({
    _id: uuidv4(), title: "", description: "", points: "100", due: "", available: "", availableUntil: "", course: cid, module: "Multiple Modules",
  });

  useEffect(() => {
    const loadAssignment = async () => {
      if (aid !== "new") {
        const existing = await assignmentClient.findAssignment(aid!);
        setAssignment(existing);
      }
    };
    loadAssignment();
  }, [aid]);

  const save = async () => {
    if (aid === "new") {
      await assignmentClient.createAssignmentForCourse(cid!, assignment);
    } else {
      await assignmentClient.updateAssignment(assignment);
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const u = (key: string) => (e: any) => setAssignment({ ...assignment, [key]: e.target.value });

  return (
    <Container>
      <div id="wd-assignments-editor">
        <Form.Label htmlFor="title">Assignment Name</Form.Label>
        <Form.Control className="mb-2" id="title" value={assignment.title} onChange={u("title")} />

        <Form.Label htmlFor="description">Description</Form.Label>
        <textarea id="description" className="w-100 mb-2" value={assignment.description} onChange={u("description")} />

        <Row className="mb-2">
          <Col className="text-end">
            <Form.Label className="wd-points">Points</Form.Label>
          </Col>
          <Col>
            <Form.Control id="points" value={assignment.points} onChange={u("points")} />
          </Col>
        </Row>

        <div className="border p-3 rounded mb-2">
          <Row className="mb-2">
            <Col className="text-end">
              <Form.Label htmlFor="due">Due Date</Form.Label>
            </Col>
            <Col>
              <Form.Control id="due" type="date" value={assignment.due} onChange={u("due")} />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col className="text-end">
              <Form.Label htmlFor="available">Available From</Form.Label>
            </Col>
            <Col>
              <Form.Control id="available" type="date" value={assignment.available} onChange={u("available")} />
            </Col>
            <Col className="text-end">
              <Form.Label htmlFor="availableUntil">Available Until</Form.Label>
            </Col>
            <Col>
              <Form.Control id="availableUntil" type="date" value={assignment.availableUntil} onChange={u("availableUntil")} />
            </Col>
          </Row>
        </div>

        <div className="right-aligned-assignment-editor-buttons justify-content-end mt-2">
          <Button size="lg" className="me-1 float-end" variant="danger" onClick={save}>
            Save
          </Button>
          <Button size="lg" className="me-1 float-end" variant="outline-secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  );
}





// import { useState } from "react";
// import { Button, Container, Form, Row, Col } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import * as db from "../../Database";
// import { useDispatch } from "react-redux";
// import { addAssignment, updateAssignment } from "./reducer";

// export default function AssignmentEditor() {
//   const { aid, cid } = useParams(); 
//   const navigate = useNavigate();

//   const existingAssignment = db.assignments.find((a) => a._id === aid);
//   const [assignment, setAssignment] = useState(existingAssignment || {
//     _id: uuidv4(), title: "", description: "", points: "100",  due: "", available: "", availableUntil: "", course: cid, module: "Multiple Modules",
//   });

// const dispatch = useDispatch();

// const save = () => {
//   if (aid === "new") {
//     dispatch(addAssignment({ ...assignment }));
//   } else {
//     dispatch(updateAssignment({ ...assignment }));
//   }
//   navigate(`/Kambaz/Courses/${cid}/Assignments`);
// };

  
//   const uTitle = (e: any) => setAssignment({ ...assignment, title: e.target.value });
//   const uDescription = (e: any) => setAssignment({ ...assignment, description: e.target.value });
//   const uPoints = (e: any) => setAssignment({ ...assignment, points: e.target.value });
//   const uDue = (e: any) => setAssignment({ ...assignment, due: e.target.value });
//   const uAvailable = (e: any) => setAssignment({ ...assignment, available: e.target.value });
//   const uAvailableUntil = (e: any) => setAssignment({ ...assignment, availableUntil: e.target.value });

//   return (
//     <Container>
//       <div id="wd-assignments-editor">
//         <Form.Label htmlFor="title">Assignment Name</Form.Label>
//         <Form.Control className="mb-2" id="title" value={assignment.title} onChange={uTitle} />

//         <Form.Label htmlFor="description">Description</Form.Label>
//         <textarea id="description" className="w-100 mb-2" value={assignment.description} onChange={uDescription} />

//         <Row className="mb-2">
//           <Col className="text-end">
//             <Form.Label className="wd-points">Points</Form.Label>
//           </Col>
//           <Col>
//             <Form.Control id="points" value={assignment.points} onChange={uPoints}/>
//           </Col>
//         </Row>

//         <div className="border p-3 rounded mb-2">
//           <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="due">Due Date</Form.Label>
//             </Col>
//             <Col>
//               <Form.Control id="due" type="date" value={assignment.due} onChange={uDue}/>
//             </Col>
//           </Row>

//           <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="available">Available From</Form.Label>
//             </Col>

//             <Col>
//               <Form.Control id="available" type="date" value={assignment.available} onChange={uAvailable} />
//             </Col>

//             <Col className="text-end">
//               <Form.Label htmlFor="availableUntil">Available Until</Form.Label>
//             </Col>

//             <Col>
//               <Form.Control id="availableUntil" type="date" value={assignment.due} onChange={uAvailableUntil} />
//             </Col>
//           </Row>
//         </div>

//         <div className="right-aligned-assignment-editor-buttons justify-content-end mt-2">
//           <Button size="lg" className="me-1 float-end" variant="danger" onClick={save}>
//             Save
//           </Button>
//           <Button size="lg" className="me-1 float-end" variant="outline-secondary" onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}>
//             Cancel
//           </Button>
//         </div>
//       </div>
//     </Container>
//   );
// }



// import { Button, Container, Form, Row, Col } from "react-bootstrap";
// import { useParams } from "react-router-dom";
// import * as db from "../../Database";

// export default function AssignmentEditor() {
//     const { aid } = useParams(); 
//     const assignment = db.assignments.find((a) => a._id === aid); 

//     if (!assignment) {
//         return <p>Assignment Unavailable</p>;
//     }

//     return (
//         <Container>
//             <div id="wd-assignments-editor">

//                 <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>
//                 <Form.Control className="mb-2" id="wd-name" value={assignment.title} />

//                 <Form.Label htmlFor="wd-description">Description</Form.Label>
//                 <textarea id="wd-description" className="w-100 mb-2" defaultValue={assignment.description} />

  
//                 <Row className="mb-2">
//                     <Col className="text-end">
//                         <Form.Label className="wd-points">Points</Form.Label>
//                     </Col>
//                     <Col>
//                         <Form.Control id="wd-points" value={assignment.points} />
//                     </Col>
//                 </Row>

//                 <Row className="mb-2">
//                     <Col className="text-end">
//                         <Form.Label htmlFor="wd-assign">Assign</Form.Label>
//                     </Col>
//                     <Col>
//                         <Form.Group controlId="wd-assign-to">
//                             <Form.Label>Assign to</Form.Label>
//                             <Form.Control as="select" defaultValue="Everyone">
//                                 <option>Everyone</option>
//                                 <option>Accelerated Students</option>
//                             </Form.Control>
//                         </Form.Group>
//                     </Col>
//                 </Row>

//                 <div className="border p-3 rounded mb-2">
//                     <Row className="mb-2">
//                         <Col className="text-end">
//                             <Form.Label htmlFor="wd-due-date">Due Date</Form.Label>
//                         </Col>
//                         <Col>
//                             <Form.Control id="wd-due-date" type="date" defaultValue={assignment.due} />
//                         </Col>
//                     </Row>

//           <Row className="mb-2">
//                   <Col className="text-end">
//                             <Form.Label htmlFor="wd-available-from">Available From</Form.Label>
//                   </Col>
//                       <Col>
//                             <Form.Control id="wd-available-from" type="date" defaultValue={assignment.available} />
//                         </Col>
//                         <Col className="text-end">
//                             <Form.Label htmlFor="wd-available-until">Available Until</Form.Label>
//                         </Col>
//                         <Col>
//                             <Form.Control id="wd-available-until" type="date" />
//                         </Col>
//                     </Row>
//                 </div>


//                 <div className = "right-aligned-assignment-editor-buttons justify-content-end mt-2">
//                   <Button size="lg" className="me-1 float-end" id="wd-add-assignment" variant="danger">
//                   Save
//                   </Button>
//                   <Button size="lg" className="me-1 float-end" id="wd-add-assignment-group" variant="outline-secondary">
//                   Cancel
//                   </Button>
            
//                   </div>
//             </div>
//         </Container>
//     );
// }




// import { Button, Container, Form, Row, Col } from "react-bootstrap";

// export default function AssignmentEditor() {
//     return (
//       <Container>
//       <div id="wd-assignments-editor">
//         <Form.Label htmlFor="wd-name">Assignment Name</Form.Label>a
//         <Form.Control className="mb-2"id="wd-name" value="A1 - ENV + HTML" />
//         <textarea id="wd-description" className="w-100 mb-2">
//           The assignment is available online Submit a link to the landing page of
//         </textarea>
        
        
//           <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label className="wd-points">Points</Form.Label>
//             </Col>
//             <Col>
//               <Form.Control id="wd-points" value={100} />
//             </Col>
//           </Row>

//           <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="wd-group">Assignment Group</Form.Label>
//             </Col>
//             <Col>
//             <Form.Select name="wd-group" id="wd-group">
//             <option value="Assignments">Assignments</option>
//             <option value="Quizzes">Quizzes</option>
//             <option value="Exams">Exams</option>
//             </Form.Select>
//             </Col>
//           </Row>

//           <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="wd-group">Display Grade As:</Form.Label>
//             </Col>
//             <Col>
//             <Form.Select name="wd-display-grade-a" id="wd-display-grade-a">
//             <option value="Percentage">Percentage</option>
//             <option value="Numeric">Numeric</option>
//             </Form.Select>
//             </Col>
//             </Row>
        
//         <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="wd-group">Display Grade As:</Form.Label>
//             </Col>
//             <Col>
//             <Form.Select name="wd-display-grade-a" id="wd-display-grade-a">
//             <option value="Percentage">Percentage</option>
//             <option value="Numeric">Numeric</option>
//             </Form.Select>
//             </Col>
//             </Row>
  
//         <div className="border p-3 rounded mb-2">
//         <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="wd-submission-type">Submission Type</Form.Label>
//             </Col>
//             <Col>
//             <Form.Select name="wd-submission-type" id="wd-submission-type">
//             <option value="Online">Online</option>
//             <option value="Hand-in">Hand-in</option>
//             </Form.Select>
//             </Col>
//             </Row>

//             <Row className="mb-2">
//             <Col className="text-end">
//               <Form.Label htmlFor="online-submission-type">Online Submission Type</Form.Label>
//             </Col>
//             <Col>
//             <Form.Check type="checkbox" label="Text Entry" />
//             <Form.Check type="checkbox" label="Website URL" defaultChecked />
//             <Form.Check type="checkbox" label="Media Recordings" />
//             <Form.Check type="checkbox" label="Student Annotation" />
//             <Form.Check type="checkbox" label="File Upload" />
//             {/* <Form.Control type="checkbox" id="wd-text-entry" name="wd-text-entry" value="text-entry"></Form.Control>
//             <Form.Label htmlFor="wd-text-entry">Text Entry</Form.Label><br />
//             <Form.Control type="checkbox" id="wd-website-url" name="wd-website-url" value="website-url"></Form.Control>
//             <Form.Label htmlFor="wd-website-url">Website URL</Form.Label><br />
//             <Form.Control type="checkbox" id="wd-media-recordings" name="wd-media-recordings" value="media-recordings"></Form.Control>
//             <Form.Label htmlFor="wd-media-recordings">Media Recordings</Form.Label><br />
//             <Form.Control type="checkbox" id="wd-student-annotation" name="wd-student-annotation" value="wd-student-annotation"></Form.Control>
//             <Form.Label htmlFor="wd-student-annotation">Student Annotation</Form.Label><br />
//             <Form.Control type="checkbox" id="wd-file-upload" name="wd-file-upload" value="wd-file-upload"></Form.Control>
//             <Form.Label htmlFor="wd-file-upload">File Upload</Form.Label><br /> */}
//             </Col>
//             </Row>
//             </div>

//     <div className="border p-3 rounded">
//     <Row className="mb-2">
//     <Col className="text-end">
//     <Form.Label htmlFor="wd-assign">Assign</Form.Label>
//     </Col>
//     <Col >
//     <Form.Group controlId="wd-assign-to">
//       <Form.Label>Assign to</Form.Label>
//     <Form.Control as="select" defaultValue="Everyone">
//       <option>Everyone</option>
//       <option>Accelerated Students</option>
//                 </Form.Control>
//             </Form.Group>
//         </Col>
//     </Row>

//     <Row className="mb-2">
//         <Col  className="text-end">
//             <Form.Label htmlFor="wd-due-date">Due:</Form.Label>
//         </Col>
//         <Col >
//             <Form.Control id="wd-due-date" type="date" className="w-100" />
//         </Col>
//     </Row>


//     <Row className="mb-2">
//         <Col className="text-end">
//             <Form.Label htmlFor="wd-available-from">Available From:</Form.Label>
//         </Col>
//         <Col >
//             <Form.Control id="wd-available-from" type="date" className="w-100" />
//         </Col>
//         <Col  className="text-end">
//             <Form.Label htmlFor="wd-available-until">Available Until:</Form.Label>
//         </Col>
//         <Col >
//             <Form.Control id="wd-available-until" type="date" className="w-100" />
//         </Col>
//     </Row>
// </div>

// <div className = "right-aligned-assignment-editor-buttons justify-content-end mt-2">
// <Button size="lg" className="me-1 float-end" id="wd-add-assignment" variant="danger">
//         Save
//         </Button>
//         <Button size="lg" className="me-1 float-end" id="wd-add-assignment-group" variant="outline-secondary">
//         Cancel
//         </Button>
  
//         </div>


// {/* 

//             <div className="border p-3 rounded">
//             <Row>
//                 <Col className="text-end" style={{ paddingRight: "10px" }}>
//                     <Form.Label htmlFor="wd-assign">Assign</Form.Label>
//                 </Col>
//                 <Col>
//                 <Form.Group controlId="wd-assign-to">
//                 <Form.Label><b>Assign to</b></Form.Label>
//                 <Form.Control as="select" defaultValue="Everyone">
//                   <option>Everyone</option>
//                   <option>Accelerated Students</option>
//                 </Form.Control>
//               </Form.Group>
              
              
//                 <Form.Label htmlFor="wd-due-date">Due:</Form.Label>
//                 <Form.Control id="wd-due-date" type="date" /> 


                
//                 <Row>
//                   <Col>
//                   <Form.Label htmlFor="wd-available-from">Available From:</Form.Label>
//                   <Form.Control id="wd-available-from" type="date" className="w-100"/>
//                   </Col> 
//                   <Col>
//                   <Form.Label htmlFor="wd-available-until">Available Until:</Form.Label>
//                   <Form.Control id="wd-available-until" type="date" className="w-100"/>  
//                   </Col>
//                 </Row>
            
//                 </Row>
//             </div> */}

           
      
//       </div>
//       </Container>
      
//   );}
  