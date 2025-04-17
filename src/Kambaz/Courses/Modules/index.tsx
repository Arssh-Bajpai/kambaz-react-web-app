import { useEffect, useState } from "react";
import { ListGroup, FormControl } from "react-bootstrap";
import { BsGripVertical, BsPencil, BsTrash, BsPlusCircle } from "react-icons/bs";
import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import "../../styles.css";
import { useParams } from "react-router";
import { setModules, addModule, editModule, updateModule, deleteModule } from "./reducer";
import * as coursesClient from "../client";
import { useSelector, useDispatch } from "react-redux";
import * as modulesClient from "./client";
import * as courseClient from "../client";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  const [moduleName, setModuleName] = useState("");

  const { modules } = useSelector((state: any) => state.modulesReducer);
  const { currentUser } = useSelector((state: any) => state.accountReducer);
  const isFaculty = currentUser?.role === "FACULTY";

  useEffect(() => {
    const init = async () => {
      const loadedModules = await coursesClient.findModulesForCourse(cid as string);
      dispatch(setModules(loadedModules));
    };
    init();
  }, [cid, dispatch]);

  const fetchModulesForCourse = async () => {
    const modules = await courseClient.findModulesForCourse(cid!);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModulesForCourse();
  }, [cid]);

  const addModuleHandler = async () => {
    const newModule = await courseClient.createModuleForCourse(cid!, {
      name: moduleName,
      course: cid,
    });
    dispatch(addModule(newModule));
    setModuleName("");
  };
 
  const createModule = async () => {
    if (!cid || !moduleName.trim()) return;
    const newModule = { name: moduleName, course: cid };
    const created = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(created));
  };

  const handleEdit = (moduleId: string) => dispatch(editModule(moduleId));

  const handleRemove = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const handleSave = async (mod: any) => {
    await modulesClient.updateModule(mod);
    dispatch(updateModule(mod));
  };

  const renderLesson = (lesson: any) => (
    <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-2 bg-light rounded mb-2">
      <BsGripVertical className="me-3 fs-4 text-muted" />
      {lesson.name}
      {isFaculty && <LessonControlButtons />}
    </li>
  );

  const renderModule = (module: any) => {
    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      dispatch(updateModule({ ...module, name: e.target.value }));
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === "Enter") {
        handleSave({ ...module, editing: false });
      }
    };

    return (
      <li key={module._id} className="wd-module list-group-item p-4 mb-4 fs-5 border-dark w-100">
        <div className="wd-title p-3 ps-3 bg-light d-flex align-items-center justify-content-between rounded">
          <div className="d-flex align-items-center flex-grow-1">
            <BsGripVertical className="me-2 fs-4 text-dark" />
            {module.editing && isFaculty ? (
              <FormControl
                className="w-75 d-inline-block form-control-sm"
                defaultValue={module.name}
                onChange={handleInputChange}
                onKeyDown={handleKeyDown}
              />
            ) : (
              <span className="fs-5 text-muted">{module.name}</span>
            )}
          </div>

          {isFaculty && (
            <div className="module-buttons d-flex justify-content-around align-items-center">
              <BsPencil className="me-3 cursor-pointer text-success" onClick={() => handleEdit(module._id)} />
              <BsTrash className="me-3 cursor-pointer text-danger" onClick={() => handleRemove(module._id)} />
              <BsPlusCircle className="cursor-pointer text-primary" onClick={createModule} />
            </div>
          )}
        </div>

        {module.lessons && module.lessons.length > 0 && (
          <ul className="wd-lessons list-group rounded-0">
            {module.lessons.map(renderLesson)}
          </ul>
        )}
      </li>
    );
  };

  return (
    <div className="wd-modules container-fluid">
      {isFaculty && (
        <ModulesControls
          setModuleName={setModuleName}
          moduleName={moduleName}
          addModule={addModuleHandler}
        />
      )}
      <ListGroup id="wd-modules" className="rounded-0 w-100">
        {modules.map(renderModule)}
      </ListGroup>
    </div>
  );
}
