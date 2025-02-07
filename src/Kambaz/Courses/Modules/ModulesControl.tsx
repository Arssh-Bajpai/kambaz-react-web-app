import { Button, Dropdown } from "react-bootstrap";
import { FaPlus } from "react-icons/fa6";
import GreenCheckmark from "./GreenCheckmark";
import "../../styles.css";

export default function ModulesControlButtons() {
  return (
    <div className="wd-module-controls">
      <Dropdown>
        <Dropdown.Toggle variant="secondary">
          <GreenCheckmark /> Publish All
        </Dropdown.Toggle>
        <Dropdown.Menu>
          <Dropdown.Item>
            <GreenCheckmark /> Publish All Modules
          </Dropdown.Item>
          <Dropdown.Item>
            <GreenCheckmark /> Publish Items Only
          </Dropdown.Item>
          <Dropdown.Item>
            <GreenCheckmark /> Unpublish All
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <Button variant="danger">
        <FaPlus className="me-2" /> Module
      </Button>
    </div>
  );
}
