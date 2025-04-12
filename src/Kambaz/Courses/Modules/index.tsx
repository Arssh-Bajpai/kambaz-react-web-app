// src/Kambaz/Courses/Modules.tsx
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import KambazNavigation from "../../Navigation";
import ModulesControls from "./ModulesControls";
import { Button } from "react-bootstrap";
import { FaGripVertical, FaPen, FaTrash, FaCheck } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";
import * as modulesClient from "./client";
import {
  addModule,
  deleteModule,
  updateModule,
  setModules,
} from "../Modules/reducer.tsx";
import * as coursesClient from "../client";

export default function Modules() {
  const { cid = "" } = useParams<{ cid: string }>();
  const dispatch = useDispatch();
  const modules = useSelector((state: any) => state.modules.modules);
  const [moduleName, setModuleName] = useState("");

  useEffect(() => {
    const fetchModules = async () => {
      try {
        const fetchedModules = await coursesClient.findModulesForCourse(cid);
        dispatch(setModules(fetchedModules));
      } catch (err) {
        console.error("Failed to fetch modules:", err);
      }
    };
    fetchModules();
  }, [cid, dispatch]);

  const handleAddModule = () => {
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName("");
  };

  const removeModule = async (moduleId: string) => {
    await modulesClient.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };

  const createModuleForCourse = async () => {
    if (!cid) return;
    const newModule = { name: moduleName, course: cid };
    const module = await coursesClient.createModuleForCourse(cid, newModule);
    dispatch(addModule(module));
  };

  const handleRemoveModule = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };

  const handleUpdateModule = (module: any) => {
    const newTitle = prompt("Update module title:", module.name);
    if (newTitle && newTitle.trim() !== "") {
      dispatch(updateModule({ ...module, name: newTitle.trim() }));
    }
  };

  const saveModule = async (module: any) => {
    await modulesClient.updateModule(module);
    dispatch(updateModule(module));
  };

  return (
    <div id="wd-kambaz">
      <KambazNavigation />
      <div className="wd-main-content">
        <div className="mb-3">
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={handleAddModule}
          />
        </div>

        <div className="d-flex align-items-start">
          <div className="flex-grow-1 me-4">
            <ul className="list-group">
              {modules
                .filter((module: any) => module.course === cid)
                .map((module: any) => (
                  <li
                    key={module._id}
                    className="list-group-item d-flex justify-content-between align-items-center mb-2"
                  >
                    <div className="d-flex align-items-center">
                      <FaGripVertical
                        className="text-muted me-2"
                        style={{ cursor: "grab" }}
                      />
                      <span>{module.name}</span>
                    </div>
                    <div>
                      <FaPen
                        className="me-3 text-primary"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleUpdateModule(module)}
                      />
                      <FaTrash
                        className="me-3 text-danger"
                        style={{ cursor: "pointer" }}
                        onClick={() => handleRemoveModule(module._id)}
                      />
                      <FaCheck
                        className="text-success"
                        style={{ cursor: "pointer" }}
                        onClick={() => saveModule(module)}
                      />
                    </div>
                  </li>
                ))}
            </ul>
          </div>

          <div style={{ width: "250px" }}>
            <h3>Course Status</h3>
            <Button variant="secondary" className="mb-2" size="sm">
              Unpublish
            </Button>
            <Button variant="success" className="mb-2 ms-2" size="sm">
              Publish
            </Button>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  Import Existing Content
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  Choose Home Page
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  New Syllabus
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  New Announcements
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  New Analytics
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  View Course Notifications
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
