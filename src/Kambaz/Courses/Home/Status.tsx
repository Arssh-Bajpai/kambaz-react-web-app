import { MdDoNotDisturbAlt } from "react-icons/md";
import { FaCheckCircle } from "react-icons/fa";
import { BiImport } from "react-icons/bi";
import { LiaFileImportSolid } from "react-icons/lia";
import { Button } from "react-bootstrap";
import { FaHouse } from "react-icons/fa6";
import { MdBarChart } from "react-icons/md";
import { TfiAnnouncement } from "react-icons/tfi";
import { FaBell } from "react-icons/fa";
{/* Find more icons */}
export default function CourseStatus() {
 return (
   <div id="wd-course-status" style={{ width: "350px" }}>
     <h2>Course Status</h2>
     <div className="d-flex">
       <div className="w-50 pe-1">
         <Button variant="secondary" size="lg" className="w-100 text-nowrap ">
           <MdDoNotDisturbAlt className="me-2 fs-5" /> Unpublish </Button> </div>
       <div className="w-50">
         <Button variant="success" size="lg" className="w-100">
           <FaCheckCircle className="me-2 fs-5" /> Publish </Button> </div>
     </div>
     <br />
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <BiImport className="me-2 fs-5" /> Import Existing Content </Button>
     <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
       <LiaFileImportSolid className="me-2 fs-5" /> Import from Commons </Button>

    <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
    <FaHouse className="me-2 fs-5" /> Choose Homepage </Button>

    <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
    <MdBarChart className="me-2 fs-5" /> View Course Screen </Button>

    <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
    <TfiAnnouncement className="me-2 fs-5"/> New Announcement </Button>

    <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
    <MdBarChart className="me-2 fs-5" /> New Analytics </Button>

    <Button variant="secondary" size="lg" className="w-100 mt-1 text-start">
    <FaBell className="me-2 fs-5" /> View Course Notifications </Button>

   </div> );}






// export default function CourseStatus() {
//     return (
//       <div id="wd-course-status">
//         <h2>Course Status</h2>
//         <button>Unpublish</button><br /> <button>Publish</button><br />
//         <button>Import Existing Content</button><br />
//         <button>Import from Commons</button><br />
//         <button>Choose Home Page</button><br />
//         <button>View Course Stream</button><br />
//         <button>New Announcement</button><br />
//         <button>New Analytics</button><br />
//         <button>View Course Notifications</button>
//       </div> );}