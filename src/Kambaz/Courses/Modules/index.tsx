import { useParams } from "react-router";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import ModuleControlButtons from "./ModuleControlButtons";
import ModulesControls from "./ModulesControl";
import { ListGroup, FormControl } from "react-bootstrap";
import { addModule, editModule, updateModule, deleteModule } from "./reducer";

export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();

  return (
    <div className="wd-modules">
      {/* ✅ Improved Module Header */}
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="text-dark fw-bold">Modules</h4>
        <div>
          <button className="btn btn-secondary me-2">✅ Publish All</button>
          <button className="btn btn-danger">➕ Module</button>
        </div>
      </div>

      {/* ✅ Improved Module Controls */}
      <ModulesControls 
        moduleName={moduleName} 
        setModuleName={setModuleName} 
        addModule={() => {
          dispatch(addModule({ name: moduleName, course: cid }));
          setModuleName("");
        }} 
      />
      
      <ListGroup id="wd-modules" className="rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
            <ListGroup.Item 
              key={module._id} 
              className="wd-module p-2 mb-3 border bg-light rounded shadow-sm d-flex justify-content-between align-items-center"
            >
              <div>
                {!module.editing && <span className="fs-5">{module.name}</span>}
                {module.editing && (
                  <FormControl
                    className="w-50 d-inline-block"
                    onChange={(e) =>
                      dispatch(updateModule({ ...module, name: e.target.value }))
                    }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        dispatch(updateModule({ ...module, editing: false }));
                      }
                    }}
                    defaultValue={module.name}
                  />
                )}
              </div>

              {/* ✅ Improved Button Alignment */}
              <ModuleControlButtons 
                moduleId={module._id}
                deleteModule={(moduleId) => dispatch(deleteModule(moduleId))}
                editModule={(moduleId) => dispatch(editModule(moduleId))}
              />
            </ListGroup.Item>
          ))}
      </ListGroup>
    </div>
  );
}
