// src/Kambaz/Courses/ModulesControls.tsx
import { useState } from "react";
import { Button, Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import ModuleEditor from "./ModuleEditor";

interface ModulesControlsProps {
  moduleName: string;
  setModuleName: (name: string) => void;
  addModule: () => void;
}

export default function ModulesControls({
  moduleName,
  setModuleName,
  addModule,
}: ModulesControlsProps) {
  const [show, setShow] = useState(false);

  const handleShow = () => setShow(true);
  const handleClose = () => setShow(false);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="outline-secondary" size="sm" className="me-2" id="wd-collapse-all">
        Collapse All
      </Button>
      <Button variant="outline-secondary" size="sm" className="me-3" id="wd-view-progress">
        View Progress
      </Button>

      <Dropdown className="me-3 d-inline-block">
        <Dropdown.Toggle variant="secondary" size="sm" id="wd-publish-all-btn">
          Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">Publish All</Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">Publish modules only</Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">Unpublish modules only</Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button variant="danger" size="sm" onClick={handleShow} id="wd-add-module-btn">
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      <ModuleEditor
        show={show}
        handleClose={handleClose}
        dialogTitle="Add Module"
        moduleName={moduleName}
        setModuleName={setModuleName}
        addModule={addModule}
      />
    </div>
  );
}
