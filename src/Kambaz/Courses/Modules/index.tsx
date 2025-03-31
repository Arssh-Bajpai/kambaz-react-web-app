// Modules.tsx
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import KambazNavigation from "../../Navigation"; // Reuse your existing navigation
import ModulesControls from "./ModulesControls"; // Top controls row (with +Module button, etc.)
import { v4 as uuidv4 } from "uuid";
import { FaGripVertical, FaPen, FaTrash, FaCheck } from "react-icons/fa";
import { Button } from "react-bootstrap";
import "bootstrap/dist/css/bootstrap.min.css";
import "../../styles.css";

export default function Modules() {
  const { cid } = useParams();

  // Local modules state
  const [modules, setModules] = useState<any[]>([
    {
      id: uuidv4(),
      title:
        "Week 1, Lecture 1 - Course Introduction, Syllabus, Agenda",
    },
    { id: uuidv4(), title: "LEARNING OBJECTIVES" },
    { id: uuidv4(), title: "Introduction to the course" },
    { id: uuidv4(), title: "Learn what is Web Development" },
  ]);

  // For the ModuleEditor modal (controlled via ModulesControls)
  const [moduleName, setModuleName] = useState("");

  // Function to add a module
  const addModule = () => {
    const newModule = {
      id: uuidv4(),
      title: moduleName.trim() || `New Module ${Date.now()}`,
    };
    setModules((prev) => [...prev, newModule]);
    setModuleName("");
  };

  // Function to remove a module
  const removeModule = (moduleId: string) => {
    setModules((prev) => prev.filter((m) => m.id !== moduleId));
  };

  // Function to update a module title
  const updateModule = (moduleId: string) => {
    const current = modules.find((m) => m.id === moduleId);
    if (!current) return;
    const newTitle = prompt("Update module title:", current.title);
    if (newTitle && newTitle.trim() !== "") {
      setModules((prev) =>
        prev.map((m) =>
          m.id === moduleId ? { ...m, title: newTitle.trim() } : m
        )
      );
    }
  };

  return (
    <div id="wd-kambaz">
      {/* LEFT SIDEBAR: Using the same navigation component */}
      <KambazNavigation />

      {/* MAIN CONTENT AREA */}
      <div className="wd-main-content">
        {/* ModulesControls row at the top */}
        <div className="mb-3">
          <ModulesControls
            moduleName={moduleName}
            setModuleName={setModuleName}
            addModule={addModule}
          />
        </div>

        {/* Flex container: Modules List (left) and Course Status bar (right) */}
        <div className="d-flex align-items-start">
          {/* LEFT COLUMN: Modules list */}
          <div className="flex-grow-1 me-4">
            <ul className="list-group">
              {modules.map((module) => (
                <li
                  key={module.id}
                  className="list-group-item d-flex justify-content-between align-items-center mb-2"
                >
                  <div className="d-flex align-items-center">
                    {/* Grip handle icon */}
                    <FaGripVertical
                      className="text-muted me-2"
                      style={{ cursor: "grab" }}
                    />
                    <span>{module.title}</span>
                  </div>
                  <div>
                    {/* Edit icon */}
                    <FaPen
                      className="me-3 text-primary"
                      style={{ cursor: "pointer" }}
                      onClick={() => updateModule(module.id)}
                    />
                    {/* Delete icon */}
                    <FaTrash
                      className="me-3 text-danger"
                      style={{ cursor: "pointer" }}
                      onClick={() => removeModule(module.id)}
                    />
                    {/* Check icon */}
                    <FaCheck
                      className="text-success"
                      style={{ cursor: "pointer" }}
                      // Add any action for the check icon if needed
                    />
                  </div>
                </li>
              ))}
            </ul>
          </div>

          {/* RIGHT COLUMN: Course Status Bar */}
          <div style={{ width: "250px" }}>
            <h3>Course Status</h3>
            <Button variant="secondary" className="mb-2" size="sm">
              Unpublish
            </Button>
            <Button variant="success" className="mb-2 ms-2" size="sm">
              Publish
            </Button>
            <ul style={{ listStyle: "none", padding: 0 }}>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  Import Existing Content
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  Choose Home Page
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  New Syllabus
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  New Announcements
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  New Analytics
                </Button>
              </li>
              <li>
                <Button variant="light" size="sm" className="mt-1">
                  View Course Notifications
                </Button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
