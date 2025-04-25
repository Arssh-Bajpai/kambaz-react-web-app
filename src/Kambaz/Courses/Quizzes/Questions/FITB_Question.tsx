import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as questionClient from "./client";

export default function FillInTheBlankEditor() {
  const { qid, cid } = useParams(); 
  const navigate = useNavigate();

  const [question, setQuestion] = useState({
    _id: uuidv4(),
    qid: "",
    qtitle: "",
    points: 0,
    question_text: "",
    answer: "",
    type: "fitb",
  });

  const saveQuestion = async () => {
    await questionClient.createQuestionForQuiz(qid!, question);
    navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  };

  return (
    <Form className="p-3">
      <h4 className="mb-3">Create Fill in the Blank Question</h4>

      <Form.Group className="mb-3">
        <Form.Label>Question Title</Form.Label>
        <Form.Control
          type="text"
          value={question.qtitle}
          onChange={(e) =>
            setQuestion({ ...question, qtitle: e.target.value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={question.points}
          onChange={(e) =>
            setQuestion({ ...question, points: Number(e.target.value) })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Question (include a blank like "__" or "...")</Form.Label>
        <ReactQuill
          value={question.question_text}
          onChange={(value) =>
            setQuestion({ ...question, question_text: value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-4">
        <Form.Label>Correct Answer</Form.Label>
        <Form.Control
          type="text"
          value={question.answer}
          onChange={(e) =>
            setQuestion({ ...question, answer: e.target.value })
          }
        />
      </Form.Group>

      <div className="d-flex gap-2">
        <Button
          variant="outline-secondary"
          onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}
        >
          Cancel
        </Button>
        <Button variant="danger" onClick={saveQuestion}>
          Save Question
        </Button>
      </div>
    </Form>
  );
}