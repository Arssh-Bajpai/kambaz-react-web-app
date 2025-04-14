import { Form, Container, Row, Col, Button } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { useState } from "react";

export default function AssignmentEditor({ 
    assignmentId, 
    updateAssignment, 
    handleClose
}: { 
    assignmentId?: string; 
    updateAssignment: (assignment: any) => void; 
    handleClose: () => void; 
}) {

    const { cid } = useParams();
    const navigate = useNavigate();
    const { currentUser } = useSelector((state: any) => state.accountReducer);
    const isFaculty = currentUser?.role === "FACULTY";
    
    const [title, setTitle] = useState("");
    const course = useState("");
    const [description, setDescription] = useState("");
    const [points, setPoints] = useState(100);
    const [dueDate, setDueDate] = useState("2025-02-21");
    const [availableFrom, setAvailableFrom] = useState("2025-02-20");
    const [availableUntil, setAvailableUntil] = useState("2025-03-20");

    const handleCancel = () => {
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
        handleClose();
    };

    const handleSave = () => {
        updateAssignment({
            _id: assignmentId, 
            title, 
            course 
        });
        navigate(`/Kambaz/Courses/${cid}/Assignments`);
        handleClose();
    };

    return (
        <Container id="wd-assignments-editor">
            <h2>{assignmentId ? "Edit Assignment" : "Create Assignment"}</h2>

            <Form>
                <Row className="align-items-center">
                    <Col xs={3}>
                        <Form.Label>Assignment Name</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            type="text"
                            value={title}
                            onChange={(e) => setTitle(e.target.value)}
                            disabled={!isFaculty}
                        />
                    </Col>
                </Row>

                <Row className="align-items-center mt-2">
                    <Col xs={3}>
                        <Form.Label>Description</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            as="textarea"
                            rows={4}
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            disabled={!isFaculty}
                        />
                    </Col>
                </Row>

                <Row className="align-items-center mt-2">
                    <Col xs={3}>
                        <Form.Label>Points</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            type="number"
                            value={points}
                            onChange={(e) => setPoints(Number(e.target.value))}
                            disabled={!isFaculty}
                        />
                    </Col>
                </Row>

                <Row className="align-items-center mt-2">
                    <Col xs={3}>
                        <Form.Label>Due Date</Form.Label>
                    </Col>
                    <Col>
                        <Form.Control
                            type="date"
                            value={dueDate}
                            onChange={(e) => setDueDate(e.target.value)}
                            disabled={!isFaculty}
                        />
                    </Col>
                </Row>

                <Row className="align-items-center mt-2">
                    <Col xs={6}>
                        <Form.Label>Available from</Form.Label>
                    </Col>
                    <Col xs={6}>
                        <Form.Label>Until</Form.Label>
                    </Col>
                </Row>

                <Row className="align-items-center">
                    <Col xs={6}>
                        <Form.Control
                            type="date"
                            value={availableFrom}
                            onChange={(e) => setAvailableFrom(e.target.value)}
                            disabled={!isFaculty}
                        />
                    </Col>
                    <Col xs={6}>
                        <Form.Control
                            type="date"
                            value={availableUntil}
                            onChange={(e) => setAvailableUntil(e.target.value)}
                            disabled={!isFaculty}
                        />
                    </Col>
                </Row>

                {isFaculty ? (
                    <div className="mt-3">
                        <Button onClick={handleSave} className="btn btn-primary me-2">
                            Save
                        </Button>
                        <Button onClick={handleCancel} className="btn btn-secondary">
                            Cancel
                        </Button>
                    </div>
                ) : (
                    <div className="mt-3">
                        <Button onClick={handleCancel} className="btn btn-secondary">
                            Back
                        </Button>
                    </div>
                )}
            </Form>
        </Container>
    );
}
