import { useState } from "react";
import { FormControl } from "react-bootstrap";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export default function WorkingWithObjects() {

  const [assignment, setAssignment] = useState({
    id: 1, title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-10-10", completed: false, score: 0,
  });

  const [module, setModule] = useState({
    id: 1,
    title: "Working with Redux",
    description: "Making redux apps duh doi",
    course: "NodeJS Assignment",
  });
  const ASSIGNMENT_API_URL = `${REMOTE_SERVER}/lab5/assignment`

  return (
    <div id="wd-working-with-objects">
      <h3>Working With Objects</h3>

      <h4>Modifying Properties</h4>
      <a id="wd-update-assignment-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${assignment.title}`}>
        Update Title
      </a>

      <FormControl className="w-75" id="wd-assignment-title"
        defaultValue={assignment.title} onChange={(e) =>
          setAssignment({ ...assignment, title: e.target.value })}/>
      <hr />

      <h4>Retrieving Objects</h4>
      <a id="wd-retrieve-assignments" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment`}>
        Get Assignment
      </a><hr/>

      <h4>Retrieving Properties</h4>
      <a id="wd-retrieve-assignment-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/assignment/title`}>
        Get Title
      </a><hr/>

      <h4>Modifying Module Properties</h4>
      <a id="wd-update-module-title"
         className="btn btn-primary float-end"
         href={`${ASSIGNMENT_API_URL}/title/${module.title}`}>
        Update Title
      </a>

      <FormControl className="w-75" id="wd-module-title"
        defaultValue={module.title} onChange={(e) =>
          setModule({ ...module, title: e.target.value })}/>
      <hr />

      <h4>Retrieving Module Objects</h4>
      <a id="wd-retrieve-modules" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module`}>
        Get Module
      </a><hr/>

      <h4>Retrieving Module Properties</h4>
      <a id="wd-retrieve-module-title" className="btn btn-primary"
         href={`${REMOTE_SERVER}/lab5/module/title`}>
        Get Module Title
      </a><hr/>
    </div>

    
);}
