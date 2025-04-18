import { useState } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import ModuleControlButtons from "./ModuleControlButtons";
import LessonControlButtons from "./LessonControlButtons";
import "../../styles.css";
import { useParams } from "react-router";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";
import { useSelector, useDispatch } from "react-redux";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";
  const dispatch = useDispatch();

  return (
    <div className="wd-modules container-fluid">
      {isFaculty && (
        <ModulesControls moduleName={moduleName} setModuleName={setModuleName}
          addModule={() => {
            dispatch(addModule({ name: moduleName, course: cid }));
            setModuleName("");
          }} />
      )}

      <ListGroup id="wd-modules" className="rounded-0 w-100">
        {modules.filter((module: any) => module.course === cid).map((module: any) => (
          <li key={module._id} className="wd-module list-group-item p-4 mb-4 fs-5 border-gray w-100">
            <div className="wd-title p-4 ps-3 bg-secondary d-flex align-items-center justify-content-between">
              <div className="d-flex align-items-center flex-grow-1">
                <BsGripVertical className="me-3 fs-3" />
                {!module.editing && <span className="fs-5">{module.name}</span>}
                {module.editing && isFaculty && (
                  <FormControl className="w-75 d-inline-block"
                    onChange={(e) => dispatch(updateModule({ ...module, name: e.target.value }))}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name} />
                )}
              </div>
              {isFaculty && (
                <ModuleControlButtons moduleId={module._id}
                  deleteModule={() => dispatch(deleteModule(module._id))}
                  editModule={() => dispatch(editModule(module._id))} />
              )}
            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li key={lesson._id} className="wd-lesson list-group-item p-4 ps-2">
                    <BsGripVertical className="me-3 fs-3" /> {lesson.name} 
                    {isFaculty && <LessonControlButtons />}
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ListGroup>
    </div>
  );
}