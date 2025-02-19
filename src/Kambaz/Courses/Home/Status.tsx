import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";
import { BsClipboardCheck, BsBell } from "react-icons/bs";
import { AiOutlineLineChart } from "react-icons/ai";
import { PiNotePencil } from "react-icons/pi";

export default function CourseStatus() {
  return (
    <div id="wd-course-status" style={{ width: "350px" }} className="p-3 border rounded bg-light">
      <h2>Course Status</h2>
      
      {/* Publish/Unpublish Buttons */}
      <div className="d-flex">
        <div className="w-50 pe-1">
          <Button variant="secondary" size="lg" className="w-100 text-nowrap d-flex align-items-center justify-content-center">
            <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish
          </Button>
        </div>
        <div className="w-50">
          <Button variant="success" size="lg" className="w-100 d-flex align-items-center justify-content-center">
            <FaCheckCircle className="me-2 fs-5" /> Publish
          </Button>
        </div>
      </div>

      <br />

      {/* Import Buttons */}
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start d-flex align-items-center">
        <BiImport className="me-2 fs-5" /> Import Existing Content
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start d-flex align-items-center">
        <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons
      </Button>

      {/* Additional Buttons with Green Checkmarks */}
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start d-flex align-items-center justify-content-between">
        <PiNotePencil className="me-2 fs-5" /> Choose Home Page
        <FaCheckCircle className="text-success" />
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start d-flex align-items-center justify-content-between">
        <BsClipboardCheck className="me-2 fs-5" /> View Course Screen
        <FaCheckCircle className="text-success" />
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start d-flex align-items-center justify-content-between">
        <PiNotePencil className="me-2 fs-5" /> New Announcement
        <FaCheckCircle className="text-success" />
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start d-flex align-items-center justify-content-between">
        <AiOutlineLineChart className="me-2 fs-5" /> New Analytics
        <FaCheckCircle className="text-success" />
      </Button>
      <Button variant="secondary" size="lg" className="w-100 mt-1 text-start d-flex align-items-center justify-content-between">
        <BsBell className="me-2 fs-5" /> View Course Notifications
        <FaCheckCircle className="text-success" />
      </Button>
    </div>
  );
}
