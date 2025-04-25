import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Spinner, Alert } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import * as assignmentClient from "./client";

export default function AssignmentEditor() {
  const { aid, cid } = useParams();
  const navigate = useNavigate();

  const [assignment, setAssignment] = useState<any>({
    _id: uuidv4(), title: "", description: "", points: "100", due: "", available: "", availableUntil: "", course: cid, module: "Multiple Modules",
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [isFormValid, setIsFormValid] = useState<boolean>(true);

  // Fetch the assignment details if editing an existing assignment
  useEffect(() => {
    const loadAssignment = async () => {
      if (aid && aid !== "new") {
        setLoading(true);
        try {
          const existing = await assignmentClient.findAssignment(aid);
          setAssignment(existing);
        } catch (err) {
          setError("Failed to load assignment details.");
        } finally {
          setLoading(false);
        }
      }
    };
    loadAssignment();
  }, [aid]);

  const validateForm = () => {
    // Simple validation to ensure title and points are filled
    if (!assignment.title || !assignment.points) {
      setIsFormValid(false);
      setError("Title and points are required.");
      return false;
    }
    setIsFormValid(true);
    return true;
  };

  const save = async () => {
    if (!validateForm()) return;

    setLoading(true);
    try {
      if (aid === "new") {
        await assignmentClient.createAssignmentForCourse(cid!, assignment);
      } else {
        await assignmentClient.updateAssignment(assignment);
      }
      navigate(`/Kambaz/Courses/${cid}/Assignments`);
    } catch (err) {
      setError("Failed to save the assignment.");
    } finally {
      setLoading(false);
    }
  };

  const u = (key: string) => (e: any) => setAssignment({ ...assignment, [key]: e.target.value });

  return (
    <Container>
      <div id="wd-assignments-editor">
        <h3>{aid === "new" ? "Create Assignment" : "Edit Assignment"}</h3>
        
        {error && <Alert variant="danger">{error}</Alert>}
        
        {loading ? (
          <Spinner animation="border" role="status">
            <span className="visually-hidden">Loading...</span>
          </Spinner>
        ) : (
          <>
            <Form.Label htmlFor="title">Assignment Name</Form.Label>
            <Form.Control
              className="mb-2"
              id="title"
              value={assignment.title}
              onChange={u("title")}
              disabled={loading}
              isInvalid={!isFormValid && !assignment.title}
            />

            <Form.Label htmlFor="description">Description</Form.Label>
            <textarea
              id="description"
              className="w-100 mb-2"
              value={assignment.description}
              onChange={u("description")}
              disabled={loading}
            />

            <Row className="mb-2">
              <Col className="text-end">
                <Form.Label className="wd-points">Points</Form.Label>
              </Col>
              <Col>
                <Form.Control
                  id="points"
                  value={assignment.points}
                  onChange={u("points")}
                  disabled={loading}
                  isInvalid={!isFormValid && !assignment.points}
                />
              </Col>
            </Row>

            <div className="border p-3 rounded mb-2">
              <Row className="mb-2">
                <Col className="text-end">
                  <Form.Label htmlFor="due">Due Date</Form.Label>
                </Col>
                <Col>
                  <Form.Control
                    id="due"
                    type="date"
                    value={assignment.due}
                    onChange={u("due")}
                    disabled={loading}
                  />
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
                    disabled={loading}
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
                    disabled={loading}
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
                disabled={loading || !isFormValid}
              >
                Save
              </Button>
              <Button
                size="lg"
                className="me-1 float-end"
                variant="outline-secondary"
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Assignments`)}
                disabled={loading}
              >
                Cancel
              </Button>
            </div>
          </>
        )}
      </div>
    </Container>
  );
}