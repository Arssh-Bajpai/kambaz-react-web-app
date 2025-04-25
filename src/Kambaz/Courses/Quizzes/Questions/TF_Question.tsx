import { useEffect, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as questionClient from "./client";

export default function TrueFalseEditor() {
  const { qid, cid } = useParams();
  const n = useNavigate();

  const initial = {
    _id: uuidv4(),
    qid: "",
    qtitle: "",
    points: 0,
    question_text: "",
    answer: false,
    type: "tf",
  };

  const [question, setQuestion] = useState(initial);
  const [questions, setQuestions] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuestions = async () => {
    const quizQuestions = await questionClient.findQuestionsForQuiz(qid!);
     if (Array.isArray(quizQuestions)) {
        setQuestions(quizQuestions);
        } else {
          console.error("Expected an array but got:", quizQuestions);
          setQuestions([]);
        }
    };
    fetchQuestions();}, [qid]);


  // const saveQuestion = async () => {
  //   await questionClient.createQuestionForQuiz(qid!, question);
  //   setQuestions([...questions, question]);
  //   n(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
  // };

  const { questionId } = useParams();
  useEffect(() => {
    if (questionId) {
      const load = async () => {
        const existing = await questionClient.findQuestionById(qid!, questionId);
        setQuestion(existing);
      };
      load();
    }
  }, [questionId]);
  
  const saveQuestion = async () => {
    if (!qid) return;
  
    try {
      if (question._id && question) {
        // Update the existing question
        await questionClient.updateQuestion(qid, question._id, question);
      } else {
        // Create a new question
        const created = await questionClient.createQuestionForQuiz(qid, question);
        setQuestions([...questions, created]);
      }
  
      n(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
    } catch (err) {
      console.error("Failed to save question:", err);
    }
  };


  return (

    <Form className="p-3">
      <Form.Group className="mb-3">
        <Form.Label>Question Title</Form.Label>
        <Form.Control
          type="text"
          value={question.qtitle}
          onChange={(e) => setQuestion({ ...question, qtitle: e.target.value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Points</Form.Label>
        <Form.Control
          type="number"
          value={question.points}
          onChange={(e) => setQuestion({ ...question, points: Number(e.target.value) })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <ReactQuill
          value={question.question_text}
          onChange={(value) => setQuestion({ ...question, question_text: value })}
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Correct Answer</Form.Label>
        <Form.Select
            value={question.answer ? "true" : "false"}
            onChange={(e) =>
            setQuestion({ ...question, answer: e.target.value === "true" })}>
            <option value="true">True</option>
            <option value="false">False</option>
        </Form.Select>
        </Form.Group>

      <div className="d-flex gap-2">
      <Button variant="outline-secondary" onClick={() => n(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}>
        Cancel
    </Button>

        <Button variant="danger" onClick={saveQuestion}>
          Update Question
        </Button>
      </div>
    </Form>
  );
}