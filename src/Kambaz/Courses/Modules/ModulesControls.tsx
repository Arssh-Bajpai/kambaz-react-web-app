import { FaPlus } from "react-icons/fa6";
import { Button, Dropdown } from "react-bootstrap";
import { useState } from "react";
import ModuleEditor from "./ModuleEditor"; 
import GreenCheckmark from "./GreenCheckmark"; 
import { MdOutlineDoNotDisturb } from "react-icons/md";



interface ModulesControlsProps {
  moduleName: string;
  setModuleName: React.Dispatch<React.SetStateAction<string>>;
  addModule: () => void;
}

export default function ModulesControls({ moduleName, setModuleName, addModule }: ModulesControlsProps) {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <div id="wd-modules-controls" className="text-nowrap">
      <Button variant="danger" onClick={handleShow}>
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
          <Dropdown.Item id="wd-unpublish-all-modules-and-items">
            <MdOutlineDoNotDisturb /> Unpublish all modules and items
          </Dropdown.Item>
          <Dropdown.Item id="wd-unpublish-modules-only">
            <MdOutlineDoNotDisturb /> Unpublish modules only
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>
      <Button 
        variant="danger" 
        size="lg" 
        className="me-1 float-end" 
        id="wd-view-progress" 
        style={{ backgroundColor: "#a1a1a1", borderColor: "#a1a1a1", color: "black" }}
      >
        View Progress
      </Button>
      <Button 
        variant="danger" 
        size="lg" 
        className="me-1 float-end" 
        id="wd-collapse-all" 
        style={{ backgroundColor: "#a1a1a1", borderColor: "#a1a1a1", color: "black" }}
      >
        Collapse All
      </Button>
    </div>
  );
}