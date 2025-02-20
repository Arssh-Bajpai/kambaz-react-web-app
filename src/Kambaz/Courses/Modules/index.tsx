import { useParams } from "react-router-dom";
import * as db from "../../Database";
import { BsGripVertical } from "react-icons/bs"; // Drag icon
import ModulesControl from "./ModulesControl"; // Import module control buttons
import LessonControlButtons from "./LessonControlButtons"; // Import lesson controls
import GreenCheckmark from "./GreenCheckmark"; // Import checkmark icon

// Define TypeScript interfaces to match `modules.json`
interface Lesson {
  _id: string;
  name: string;
}

interface Module {
  _id: string;
  name: string;
  description: string;
  course: string;
  lessons?: Lesson[]; // Updated to correctly type lessons
}

export default function Modules() {
  const { cid } = useParams(); // Get course ID from URL
  const modules: Module[] = db.modules; // Get all modules from database

  return (
    <ul id="wd-modules" className="list-group rounded-0">
      {modules
        .filter((module) => module.course === cid) // Only show modules for the selected course
        .map((module) => (
          <li key={module._id} className="wd-module list-group-item p-0 mb-5 fs-5 border-gray">
            <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center justify-content-between">
              <span className="d-flex align-items-center">
                <BsGripVertical className="me-2 fs-3" /> {/* Drag icon */}
                {module.name}
              </span>
              <ModulesControl /> {/* Module control buttons */}
            </div>

            {/* Render lessons for each module, correctly accessing lesson names */}
            <ul className="wd-lessons list-group rounded-0">
              {module.lessons?.map((lesson) => (
                <li key={lesson._id} className="wd-lesson list-group-item p-3 ps-1 d-flex justify-content-between">
                  {lesson.name} {/* Now correctly accessing lesson name */}
                  <span className="d-flex align-items-center">
                    <GreenCheckmark /> {/* Add checkmark if lesson is completed */}
                    <LessonControlButtons /> {/* Lesson control buttons */}
                  </span>
                </li>
              )) || <li className="list-group-item p-3 ps-1 text-muted">No lessons available</li>}
            </ul>
          </li>
        ))}
    </ul>
  );
}
