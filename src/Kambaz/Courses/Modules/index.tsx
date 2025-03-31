// Modules.tsx
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import KambazNavigation from "../../Navigation"; // Your existing sidebar
import ModulesControls from "./ModulesControls"; // Top controls row (with +Module button, etc.)
import { Button } from "react-bootstrap";
import { FaGripVertical, FaPen, FaTrash, FaCheck } from "react-icons/fa";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";

// Import actions from your reducer file – adjust the path as needed
import { addModule, deleteModule, updateModule } from "../Modules/reducer";

export default function Modules() {
  const { cid } = useParams();
  const dispatch = useDispatch();

  // Retrieve the modules array from your Redux store.
  // (Ensure your store is configured so that state.modules.modules exists.)
  const modules = useSelector((state: any) => state.modules.modules);

  // Local state for the new module name (used in the ModuleEditor modal)
  const [moduleName, setModuleName] = useState("");

  // Dispatch global addModule action
  const handleAddModule = () => {
    dispatch(addModule({ name: moduleName, course: cid }));
    setModuleName("");
  };

  // Dispatch global deleteModule action
  const handleRemoveModule = (moduleId: string) => {
    dispatch(deleteModule(moduleId));
  };

  // Dispatch global updateModule action
  const handleUpdateModule = (module: any) => {
    const newTitle = prompt("Update module title:", module.name);
    if (newTitle && newTitle.trim() !== "") {
      dispatch(updateModule({ ...module, name: newTitle.trim() }));
    }
  };

  return (
    <div id="wd-kambaz">
      {/* LEFT SIDEBAR */}
      <KambazNavigation />

      {/* MAIN CONTENT AREA */}
      <div className="wd-main-content">
        {/* ModulesControls row at the top */}
        <div className="mb-3">
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={handleAddModule}
          />
        </div>

        {/* Flex container with Modules List and Course Status Bar */}
        <div className="d-flex align-items-start">
          {/* LEFT COLUMN: Modules list */}
          <div className="flex-grow-1 me-4">
            <ul className="list-group">
              {modules.map((module: any) => (
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
                      // Optionally, add an onClick action for the check icon here.
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: Course Status Bar */}
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
