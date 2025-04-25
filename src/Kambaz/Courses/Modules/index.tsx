import ModulesControls from "./ModulesControls";
import { BsGripVertical } from "react-icons/bs";
import LessonControlButtons from "./LessonControlButtons";
import ModuleControlButtons from "./ModuleControlButtons";
import { useParams } from "react-router";
import { useState, useEffect } from "react";
import * as coursesClient from "../client";
import * as modulesClient from "./client";
// import { v4 as uuidv4 } from "uuid";
import { FormControl, ListGroup } from "react-bootstrap";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };


  const fetchModules = async () => {
    const modules = await coursesClient.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div className="wd-modules">
      <ListGroup id="wd-modules" className="rounded-0">
      <ModulesControls
        moduleName={moduleName} setModuleName={setModuleName} addModule={createModuleForCourse}
      />


        {modules.map((module: any) => (
            
            <ListGroup.Item key={module._id} className="wd-module p-0 mb-5 fs-5 border-gray">
              <div className="wd-title p-3 ps-2 bg-secondary">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                { module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    defaultValue={module.name}
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });
                      }
                    }}
                  />
                )}


                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => removeModule(moduleId)}
                  editModule={() => dispatch(editModule(module._id))}
                />
              </div>


              {module.lessons && (
                <ul className="wd-lessons list-group rounded-0">
                  {module.lessons.map((lesson: any) => (
                    <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1">
                      <BsGripVertical className="me-2 fs-3" /> {lesson.name}
                      <LessonControlButtons />
                    </li>
                  ))}
                </ul>
              )}
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}




// import ModulesControls from "./ModulesControls"
// import { BsGripVertical } from "react-icons/bs"
// import LessonControlButtons from "./LessonControlButtons"
// import ModuleControlButtons from "./ModuleControlButtons"
// import { useParams } from "react-router";
// import React, { useState } from "react";
// import { v4 as uuidv4 } from "uuid";
// import {FormControl } from "react-bootstrap";

// import * as db from "../../Database";


// export default function Modules() {
//   const { cid } = useParams();
//   const [modules, setModules] = useState<any[]>(db.modules);
//   const [moduleName, setModuleName] = useState("");
//   const addModule = () => {
//     setModules([ ...modules, { _id: uuidv4(), name: moduleName, course: cid, lessons: [] } ]);
//     setModuleName("");
//   };
//   const deleteModule = (moduleId: string) => {
//     setModules(modules.filter((m) => m._id !== moduleId));
//   };
//   const editModule = (moduleId: string) => {
//     setModules(modules.map((m) => (m._id === moduleId ? { ...m, editing: true } : m)));
//   };
//   const updateModule = (module: any) => {
//     setModules(modules.map((m) => (m._id === module._id ? module : m)));
//   };

//   return (
//     <div>
//       <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={addModule} /><br /><br /><br />
//     <ul id="wd-modules" className="list-group rounded-0">
//         {modules
//           .filter((module: any) => module.course === cid)
//           .map((module: any) => (
//           <li className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
//             <div className="wd-title p-3 ps-2 bg-secondary">
//               <BsGripVertical className="me-2 fs-3" /> {module.name} 
//               {!module.editing && module.name}
//              { module.editing && (
//               <FormControl className="w-50 d-inline-block"
//                onChange={(e) => updateModule({ ...module, name: e.target.value })}
//                onKeyDown={(e) => {
//                  if (e.key === "Enter") {
//                    updateModule({ ...module, editing: false });
//                  }
//                }}
//                defaultValue={module.name}/>
//       )}

//               <ModuleControlButtons moduleId={module._id}
//         deleteModule={deleteModule} editModule={editModule}/>
//             </div>
//             {module.lessons && (
//               <ul className="wd-lessons list-group rounded-0">
//                 {module.lessons.map((lesson: any) => (
//                   <li className="wd-lesson list-group-item p-3 ps-1">
//                     <BsGripVertical className="me-2 fs-3" /> {lesson.name} <LessonControlButtons />
//                   </li>
//                 ))}</ul>)}</li>))}
//                 </ul>
//   </div>
//   )}

// export default function Modules() {
// return (
//   <div>
//   <ModulesControls /><br /><br /><br />
//   <ListGroup className="rounded-0" id="wd-modules">
//     <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//       <div className="wd-title p-3 ps-2 bg-secondary">
//         <BsGripVertical className="me-2 fs-3" /> Week 1 <ModuleControlButtons />
//       </div>
//       <ListGroup className="wd-lessons rounded-0">
//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//           <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES <LessonControlButtons />
//         </ListGroup.Item>
//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//           <BsGripVertical className="me-2 fs-3" /> Introduction to the course <LessonControlButtons />
//         </ListGroup.Item>
//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" />Learn what is Web Development <LessonControlButtons /></ListGroup.Item>
//       </ListGroup>
//     </ListGroup.Item>
//     <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
//       <div className="wd-title p-3 ps-2 bg-secondary"> Week 2 </div>
//       <ListGroup className="wd-lessons rounded-0">
//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" />LESSON 1 <LessonControlButtons /> </ListGroup.Item> 
//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" />LESSON 2 <LessonControlButtons /></ListGroup.Item> 
//         <ListGroup.Item className="wd-lesson p-3 ps-1">
//         <BsGripVertical className="me-2 fs-3" />LESSON 3<LessonControlButtons /></ListGroup.Item>
//       </ListGroup>
//     </ListGroup.Item>
//   </ListGroup>
// </div>


// )}




// export default function Modules() {
//   return (
//     <div>
//       {/* Top Buttons */}
//       <div className="d-flex justify-content-between mb-3">
//         <div>
//           <Button className="course-modules-buttons me-2">Collapse All</Button>
//           <Button className="course-modules-buttons me-2">View Progress</Button>
//           <Button className="course-modules-buttons me-2">Publish All <GreenCheckmark /></Button>
//         </div>
//         <Button variant="danger"> + Module</Button>
//       </div>
//       <ModulesControls />


//       <ul id="wd-modules">

//         <li className="wd-module card mb-4">
//           <div className="wd-title card-header bg-secondary text-white d-flex"> <PiDotsSixVerticalBold/> Week 1 <GreenCheckmark/> <PiDotsThreeVertical /> <FiPlus /> </div> 
//           <ul className="wd-lessons list-group list-group-flush">
//             <li className="wd-lesson list-group-item">
//               <ul className="wd-content list-unstyled ps-3">
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> LEARNING OBJECTIVES <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> Introduction to the course <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> Learn what is Web Development <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </li>


//         <li className="wd-module card mb-4">
//           <div className="wd-title card-header bg-secondary text-white d-flex"> <PiDotsSixVerticalBold/> Week 2 <GreenCheckmark/> <PiDotsThreeVertical /> <FiPlus /> </div>
//           <ul className="wd-lessons list-group list-group-flush">
//             <li className="wd-lesson list-group-item">
//               <ul className="wd-content list-unstyled ps-3">
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> HTML OVERVIEW <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> What is HTML? <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> A1 <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> P1 <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </li>

  
//         <li className="wd-module card mb-4">
//           <div className="wd-title card-header bg-secondary text-white d-flex"> <PiDotsSixVerticalBold/> Week 3 <GreenCheckmark/> <PiDotsThreeVertical /> <FiPlus /> </div>
//           <ul className="wd-lessons list-group list-group-flush">
//             <li className="wd-lesson list-group-item">
//               <ul className="wd-content list-unstyled ps-3">
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> CSS OVERVIEW <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> What is CSS? <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> A1 <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//                 <li className="wd-content-item">
//                   <PiDotsSixVerticalBold className="me-2 text-muted" /> P1 <GreenCheckmark/> <PiDotsThreeVertical />
//                 </li>
//               </ul>
//             </li>
//           </ul>
//         </li>
//       </ul>
//     </div>
//   );
// }










//       {/* <div className="d-flex justify-content-between mb-3">
//         <div>
//           <Button className="course-modules-buttons me-2">Collapse All</Button>
//           <Button className="course-modules-buttons me-2">View Progress</Button>
//           <Button className="course-modules-buttons me-2">Publish All <GreenCheckmark /></Button>
//         </div>
//         <Button variant="danger"> + Module</Button>
//       </div>


//         <ul id="wd-modules">
//           <li className="wd-module card mb-4">
//             <div className="wd-title card-header bg-secondary text-white d-flex">Week 1</div>
//             <ul className="wd-lessons list-group list-group-flush">
//               <li className="wd-lesson list-group-item">
//                 <ul className="wd-content list-unstyled ps-3">
//                 <li className="wd-content-item">LEARNING OBJECTIVES</li>
//                   <li className="wd-content-item">Introduction to the course</li>
//                   <li className="wd-content-item">Learn what is Web Development</li>
//                 </ul>
//               </li>
//             </ul>
//           </li>

//           <li className="wd-module card mb-4">
//             <div className="wd-title card-header bg-secondary text-white d-flex">Week 1</div>
//             <ul className="wd-lessons list-group list-group-flush">
//               <li className="wd-lesson list-group-item">
//                 <ul className="wd-content list-unstyled ps-3">
//                 <li className="wd-content-item">HTML OVERVIEW</li>
//                   <li className="wd-content-item">What is HTML?</li>
//                   <li className="wd-content-item">A1</li>
//                   <li className="wd-content-item">P1</li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//           <li className="wd-module card mb-4">
//             <div className="wd-title card-header bg-secondary text-white d-flex">Week 1</div>
//             <ul className="wd-lessons list-group list-group-flush">
//               <li className="wd-lesson list-group-item">
//                 <ul className="wd-content list-unstyled ps-3">
//                 <li className="wd-content-item">CSS OVERVIEW</li>
//                 <li className="wd-content-item">What is CSS?</li>
//                 <li className="wd-content-item">
//                 <PiDotsSixVerticalBold /> A1
//                 </li>
//                   <li className="wd-content-item">P1</li>
//                 </ul>
//               </li>
//             </ul>
//           </li>
//         </ul>
//       </div> */}
  