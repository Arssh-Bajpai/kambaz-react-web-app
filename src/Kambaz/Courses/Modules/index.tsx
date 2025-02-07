import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControl";
import "../../styles.css";

export default function Modules() {
  return (
    <div className="wd-modules-container">
      <ModulesControls />
      <ListGroup className="rounded-0">
        {/* Week 1 */}
        <ListGroup.Item className="wd-module p-0 mb-4">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between">
            <span>Week 1</span>
            <ModulesControls />
          </div>
          <ListGroup className="wd-lessons">
            <ListGroup.Item className="wd-lesson p-3">
              LEARNING OBJECTIVES
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3">
              Introduction to Web Development
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Week 2 */}
        <ListGroup.Item className="wd-module p-0 mb-4">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex justify-content-between">
            <span>Week 2</span>
            <ModulesControls />
          </div>
          <ListGroup className="wd-lessons">
            <ListGroup.Item className="wd-lesson p-3">
              LESSON 1
            </ListGroup.Item>
            <ListGroup.Item className="wd-lesson p-3">
              LESSON 2
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
