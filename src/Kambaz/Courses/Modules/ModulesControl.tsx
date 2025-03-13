import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import { Button, Dropdown } from "react-bootstrap";
import ModuleEditor from "./ModuleEditor";
import { useState } from "react";

export default function ModulesControls(
  { moduleName, setModuleName, addModule }:
  { moduleName: string; setModuleName: (title: string) => void; addModule: () => void; }
) {
  const [show, setShow] = useState(false);

  // ✅ Function to open the ModuleEditor dialog
  const handleShow = () => setShow(true);

  // ✅ Function to close the ModuleEditor dialog
  const handleClose = () => setShow(false);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      {/* ✅ Add Module Button (Opens Modal) */}
      <Button 
        variant="danger" 
        size="lg" 
        className="me-1 float-end" 
        id="wd-add-module-btn" 
        onClick={handleShow} // 🔥 Handle show added here
      >
        <FaPlus className="position-relative me-2" style={{ bottom: "1px" }} />
        Module
      </Button>

      {/* ✅ Publish Dropdown Menu */}
      <Dropdown className="float-end me-2">
        <Dropdown.Toggle variant="secondary" size="lg" id="wd-publish-all-btn">
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item id="wd-publish-all">
            <GreenCheckmark /> Publish All
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-all-modules-and-items">
            <GreenCheckmark /> Publish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-publish-modules-only">
            <GreenCheckmark /> Publish modules only
          </Dropdown.Item>
          {/* ✅ Added Unpublish options */}
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            ❌ Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            ❌ Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      {/* ✅ View Progress & Collapse All Buttons */}
      <Button variant="outline-secondary" className="float-end me-2" id="wd-view-progress">
        View Progress
      </Button>
      <Button variant="outline-secondary" className="float-end me-2" id="wd-collapse-all">
        Collapse All
      </Button>

      {/* ✅ Module Editor Dialog */}
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
