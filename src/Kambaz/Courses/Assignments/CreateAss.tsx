// src/Kambaz/Courses/Assignments/CreateAss.tsx
import { useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { useDispatch } from "react-redux";
import { addAssignment as addAssignmentAction } from "./reducer";
import * as assignmentsClient from "../client";

interface CreatorProps {
  show: boolean;
  handleClose: () => void;
  cid: string | undefined; // Course ID
}

export default function Creator({ show, handleClose, cid }: CreatorProps) {
  const dispatch = useDispatch();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [points, setPoints] = useState<number>(100);
  const [dueDate, setDueDate] = useState("");
  const [availableFrom, setAvailableFrom] = useState("");
  const [availableUntil, setAvailableUntil] = useState("");

  const handleSave = async () => {
    if (!cid) return;
    try {
      // Await the returned assignment object so that "created" is not void.
      const created = await assignmentsClient.createAssignment({
        course: cid,
        name,
        description,
        points,
        dueDate,
        availableFrom,
        availableUntil,
      });
      dispatch(addAssignmentAction(created));
    } catch (error) {
      console.error("Error creating assignment:", error);
    }
    // Clear the form values
    setName("");
    setDescription("");
    setPoints(100);
    setDueDate("");
    setAvailableFrom("");
    setAvailableUntil("");
    handleClose();
  };

  return (
    <Modal show={show} onHide={handleClose} backdrop="static" centered>
      <Modal.Header closeButton>
        <Modal.Title>New Assignment</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Assignment Name</Form.Label>
            <Form.Control
              type="text"
              placeholder="Enter assignment name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Description</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Assignment description..."
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Points</Form.Label>
            <Form.Control
              type="number"
              value={points}
              onChange={(e) => setPoints(Number(e.target.value))}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Due Date</Form.Label>
            <Form.Control
              type="date"
              value={dueDate}
              onChange={(e) => setDueDate(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Available From</Form.Label>
            <Form.Control
              type="date"
              value={availableFrom}
              onChange={(e) => setAvailableFrom(e.target.value)}
            />
          </Form.Group>
          <Form.Group className="mb-3">
            <Form.Label>Available Until</Form.Label>
            <Form.Control
              type="date"
              value={availableUntil}
              onChange={(e) => setAvailableUntil(e.target.value)}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Cancel
        </Button>
        <Button variant="primary" onClick={handleSave}>
          Save
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
