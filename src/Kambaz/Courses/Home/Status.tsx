import { Button } from "react-bootstrap";
import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import "../../styles.css";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" className="wd-course-status">
      <h2>Course Status</h2>
      <div className="d-flex justify-content-between">
        <Button variant="secondary" size="lg">
          <MdDoNotDisturbAlt className="me-2" /> Unpublish
        </Button>
        <Button variant="success" size="lg">
          <FaCheckCircle className="me-2" /> Publish
        </Button>
      </div>
      <br />
      <Button variant="secondary" className="w-100 mt-1">
        <BiImport className="me-2" /> Import Existing Content
      </Button>
      <Button variant="secondary" className="w-100 mt-1">
        <LiaFileImportSolid className="me-2" /> Import from Commons
      </Button>
    </div>
  );
}
