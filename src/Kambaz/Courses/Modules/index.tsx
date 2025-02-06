import { ListGroup } from "react-bootstrap";
import ModulesControls from "./ModulesControl";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from "react-icons/bs";

export default function Modules() {
  return (
    <div className="container-fluid">
      <ModulesControls />
      <br />

      <ListGroup className="rounded-0" id="wd-modules">
        {/* Week 1 */}
        <ListGroup.Item className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" /> Week 1
            </div>
            <ModulesControls />
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" /> LEARNING OBJECTIVES
              </div>
              <LessonControlButtons />
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" /> Introduction to Web Development
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>

        {/* Week 2 */}
        <ListGroup.Item className="wd-module p-0 mb-4 fs-5 border-gray">
          <div className="d-flex justify-content-between align-items-center p-3 ps-2 bg-secondary">
            <div>
              <BsGripVertical className="me-2 fs-3" /> Week 2
            </div>
          </div>

          <ListGroup className="wd-lessons rounded-0">
            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" /> LESSON 1
              </div>
              <LessonControlButtons />
            </ListGroup.Item>

            <ListGroup.Item className="wd-lesson p-3 ps-1 d-flex justify-content-between">
              <div>
                <BsGripVertical className="me-2 fs-3" /> LESSON 2
              </div>
              <LessonControlButtons />
            </ListGroup.Item>
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
