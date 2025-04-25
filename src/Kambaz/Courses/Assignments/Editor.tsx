import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState<any>({
    title: "",
    description: "",
    points: "100",
    due: "",
    available: "",
    availableUntil: "",
    course: cid,
    module: "Multiple Modules",
  });

  useEffect(() => {
    const loadAssignment = async () => {
      if (aid !== "new") {
        const existing = await assignmentClient.findAssignment(aid!);
        if (existing) {
          setAssignment(existing);
        } else {
          setAssignment({
            title: "",
            description: "",
            points: "100",
            due: "",
            available: "",
            availableUntil: "",
            course: cid,
            module: "Multiple Modules",
          });
        }
      }
    };
    loadAssignment();
  }, [aid]);

  const save = async () => {
    if (aid === "new") {
      await assignmentClient.createAssignment(cid!, assignment);
    } else {
      await assignmentClient.updateAssignment(assignment);
    }
    navigate(`/Kambaz/Courses/${cid}/Assignments`);
  };

  const u = (key: string) => (e: any) =>
    setAssignment({ ...assignment, [key]: e.target.value });

  return (
    <Container>
      <div id="wd-assignments-editor">
        <Form.Label htmlFor="title">Assignment Name</Form.Label>
        <Form.Control className="mb-2" id="title" value={assignment.title} onChange={u("title")} />

        <Form.Label htmlFor="description">Description</Form.Label>
        <textarea
          id="description"
          className="w-100 mb-2"
          value={assignment.description}
          onChange={u("description")}
        />

        <Row className="mb-2">
          <Col className="text-end">
            <Form.Label className="wd-points">Points</Form.Label>
          </Col>
          <Col>
            <Form.Control id="points" value={assignment.points} onChange={u("points")} />
          </Col>
        </Row>

        <div className="border p-3 rounded mb-2">
          <Row className="mb-2">
            <Col className="text-end">
              <Form.Label htmlFor="due">Due Date</Form.Label>
            </Col>
            <Col>
              <Form.Control id="due" type="date" value={assignment.due} onChange={u("due")} />
            </Col>
          </Row>

          <Row className="mb-2">
            <Col className="text-end">
              <Form.Label htmlFor="available">Available From</Form.Label>
            </Col>
            <Col>
              <Form.Control
                id="available"
                type="date"
                value={assignment.available}
                onChange={u("available")}
              />
            </Col>
            <Col className="text-end">
              <Form.Label htmlFor="availableUntil">Available Until</Form.Label>
            </Col>
            <Col>
              <Form.Control
                id="availableUntil"
                type="date"
                value={assignment.availableUntil}
                onChange={u("availableUntil")}
              />
            </Col>
          </Row>
        </div>

        <div className="right-aligned-assignment-editor-buttons justify-content-end mt-2">
          <Button
            size="lg"
            className="me-1 float-end"
            variant="danger"
            onClick={save}
          >
            Save
          </Button>
          <Button
            size="lg"
            className="me-1 float-end"
            variant="outline-secondary"
            onClick={() =>
              navigate(`/Kambaz/Courses/${cid}/Assignments`)
            }
          >
            Cancel
          </Button>
        </div>
      </div>
    </Container>
  );
}
