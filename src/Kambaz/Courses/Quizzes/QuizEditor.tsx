import { useEffect, useState } from "react";
import { Button, Container, Form, Row, Col, Tabs, Tab } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import * as quizClient from "./client.ts";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";

export default function QuizEditor() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();
  const [key, setKey] = useState("details");
  const [questionType, setQuestionType] = useState("mcq");

  const [quiz, setQuiz] = useState<any>({
    title: "",
    description: "",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: true,
    timeLimit: 20,
    multipleAttempts: false,
    showCorrectAnswers: "",
    accessCode: "",
    oneQuestionAtATime: true,
    webcamRequired: false,
    lockQuestionsAfterAnswering: false,
    due: "",
    available: "",
    availableUntil: "",
    course: cid,
    published: false,
  });

  useEffect(() => {
    const loadQuiz = async () => {
      if (qid && qid !== "new") {
        const existing = await quizClient.findQuiz(qid);
        setQuiz(existing);
      }
    };
    loadQuiz();
  }, [qid]);

  const save = async () => {
    try {
      if (qid === "new") {
        const created = await quizClient.createQuizForCourse(cid!, quiz);
        console.log("Created quiz:", created);
        if (created?._id) {
          setQuiz(created);
          navigate(`/Kambaz/Courses/${cid}/Quizzes/${created._id}`);
        } else {
          console.error("Quiz creation failed or ID missing:", created);
        }
      } else {
        const updated = await quizClient.updateQuiz(quiz);
        setQuiz(updated); 
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
      }
    } catch (err) {
      console.error("Error saving quiz:", err);
    }
  };

  const saveAndPublish = async () => {
    try {
      const updatedQuiz = { ...quiz, published: true };
  
      if (qid === "new") {
        const created = await quizClient.createQuizForCourse(cid!, updatedQuiz);
        console.log("Created and published quiz:", created);
  
        if (created?._id) {
          navigate(`/Kambaz/Courses/${cid}/Quizzes`);
        } else {
          alert("Something went wrong creating the quiz!");
        }
      } else {
        const updated = await quizClient.updateQuiz(quiz);
        setQuiz(updated); 
        // navigate(`/Kambaz/Courses/${cid}/Quizzes/${updated._id}`);
        navigate(`/Kambaz/Courses/${cid}/Quizzes`);
      }
    } catch (err) {
      console.error("Failed to save and publish quiz:", err);
      alert("Could not save and publish quiz.");
    }
  };
  
  const handleAddQuestion = async () => {
    if (!quiz._id || qid === "new") {
      const created = await quizClient.createQuizForCourse(cid!, quiz);
      setQuiz(created);
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${created._id}/new/${questionType}`);
    } else {
      navigate(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/new/${questionType}`);
    }
  };
  
  const [questions, setQuestions] = useState<any[]>([]);

useEffect(() => {
  const loadQuestions = async () => {
    if (qid) {
      const res = await quizClient.findQuestionsForQuiz(qid);
      setQuestions(res);
    }
  };
  loadQuestions();
}, [qid]);

// const handleDelete = async (qid: string) => {
//   await quizClient.deleteQuestion(quiz._id, qid);
//   setQuestions(questions.filter(q => q._id !== qid));
// };

const handleDelete = async (questionId: string) => {
  const confirmDelete = window.confirm("Are you sure you'd like to delete this question?");
  if (!confirmDelete) return;
  try {
    await quizClient.deleteQuestion(quiz._id, questionId);
    setQuestions(questions.filter((q) => q._id !== questionId));
  } catch (err) {
    console.error(" Failed to delete question:", err);
  }
};

  
  

  const u = (key: string) => (e: any) =>
    setQuiz({
      ...quiz,
      [key]: e.target.type === "checkbox" ? e.target.checked : e.target.value,
    });

  return (
    <Container>
      <div id="wd-quiz-editor">
        <Tabs
          activeKey={key}
          onSelect={(selectedKey) => setKey(selectedKey || "details")}
          className="mb-3"
        >
          <Tab eventKey="details" title="Details">
            <Form.Label htmlFor="title">Title</Form.Label>
            <Form.Control
              className="mb-2"
              id="title"
              value={quiz.title ?? ""}
              onChange={u("title")}
            />

            <Form.Label htmlFor="description">Description</Form.Label>
            <ReactQuill
              id="description"
              className="w-100 mb-2"
              value={quiz.description}
              onChange={(value: any) =>
                setQuiz({ ...quiz, description: value })
              }
            />

            <Row className="mb-2">
              <Col><Form.Label>Quiz Type</Form.Label></Col>
              <Col>
                <Form.Select value={quiz.quizType} onChange={u("quizType")}>
                  <option>Graded Quiz</option>
                  <option>Practice Quiz</option>
                  <option>Graded Survey</option>
                  <option>Ungraded Survey</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col><Form.Label>Assignment Group</Form.Label></Col>
              <Col>
                <Form.Select value={quiz.assignmentGroup} onChange={u("assignmentGroup")}>
                  <option>Quizzes</option>
                  <option>Exams</option>
                  <option>Assignments</option>
                  <option>Project</option>
                </Form.Select>
              </Col>
            </Row>

            <Row className="mb-2">
              <Col><Form.Label>Points</Form.Label></Col>
              <Col>
                <Form.Control
                  type="number"
                  value={quiz.points}
                  onChange={u("points")}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col><Form.Label>Options</Form.Label></Col>
              <Col>
                <Form.Check
                  label="Shuffle Answers"
                  checked={quiz.shuffleAnswers}
                  onChange={u("shuffleAnswers")}
                />
              </Col>
              <Col>
                <Form.Control
                  type="number"
                  value={quiz.timeLimit}
                  onChange={u("timeLimit")}
                  placeholder="Time Limit (mins)"
                />
              </Col>
            </Row>

            <Form.Check
              label="Multiple Attempts"
              checked={quiz.multipleAttempts}
              onChange={u("multipleAttempts")}
            />
            <Form.Control
              className="mb-2"
              placeholder="Show Correct Answers"
              value={quiz.showCorrectAnswers}
              onChange={u("showCorrectAnswers")}
            />
            <Form.Control
              className="mb-2"
              placeholder="Access Code"
              value={quiz.accessCode}
              onChange={u("accessCode")}
            />
            <Form.Check
              label="One Question at a Time"
              checked={quiz.oneQuestionAtATime}
              onChange={u("oneQuestionAtATime")}
            />
            <Form.Check
              label="Webcam Required"
              checked={quiz.webcamRequired}
              onChange={u("webcamRequired")}
            />
            <Form.Check
              label="Lock Questions After Answering"
              checked={quiz.lockQuestionsAfterAnswering}
              onChange={u("lockQuestionsAfterAnswering")}
            />

            <Row className="mb-2 mt-2">
              <Col><Form.Label>Due Date</Form.Label></Col>
              <Col>
                <Form.Control
                  type="date"
                  value={quiz.due}
                  onChange={u("due")}
                />
              </Col>
            </Row>

            <Row className="mb-2">
              <Col><Form.Label>Available From</Form.Label></Col>
              <Col>
                <Form.Control
                  type="date"
                  value={quiz.available}
                  onChange={u("available")}
                />
              </Col>
              <Col><Form.Label>Until</Form.Label></Col>
              <Col>
                <Form.Control
                  type="date"
                  value={quiz.availableUntil}
                  onChange={u("availableUntil")}
                />
              </Col>
            </Row>

            <div className="d-flex justify-content-end mt-2">
              <Button className="me-2" variant="danger" onClick={save}>
                Save
              </Button>
              <Button className="me-2" variant="success" onClick={saveAndPublish}>
                Save and Publish
              </Button>
              <Button
                variant="outline-secondary"
                onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes`)}
              >
                Cancel
              </Button>
            </div>
          </Tab>

          {/* <Tab eventKey="questions" title="Questions">
            <div></div>
            <Form.Group className="mb-3 mt-3">
              <Form.Label>Question Type</Form.Label>
              <Form.Select
                value={questionType}
                onChange={(e) => setQuestionType(e.target.value)}
              >
                <option value="mcq">Multiple Choice</option>
                <option value="tf">True/False</option>
                <option value="fitb">Fill in the Blank</option>
              </Form.Select>
            </Form.Group>
            <Button
              variant="danger"
              onClick={handleAddQuestion}
            >
              Add New Question
            </Button>
          </Tab> */}

<Tab eventKey="questions" title="Questions">
  <Form.Group className="mb-3 mt-3">
    <Form.Label>Question Type</Form.Label>
    <Form.Select
      value={questionType}
      onChange={(e) => setQuestionType(e.target.value)}
    >
      <option value="mcq">Multiple Choice</option>
      <option value="tf">True/False</option>
      <option value="fitb">Fill in the Blank</option>
    </Form.Select>
  </Form.Group>

  <Button variant="danger" onClick={handleAddQuestion} className="mb-4">
    Add New Question
  </Button>

  {questions.length === 0 && (
    <div className="text-muted">No questions added yet.</div>
  )}

  {questions.map((q, i) => (
    <div key={q._id} className="border rounded p-3 mb-3 bg-light">
      <h5 className="text-dark">{q.qtitle || `Question ${i + 1}`}</h5>
      <div dangerouslySetInnerHTML={{ __html: q.question_text }} />
      <div className="mt-2">
        Points: {q.points}
      </div>

      {q.type === "mcq" && (
        <ul className="mt-2">
          {q.answers.map((a: any, idx: any) => (
            <li key={idx}>
              {a.text} {a.isCorrect && <p>(correct answer)</p>}
            </li>
          ))}
        </ul>
      )}

      {q.type === "tf" && (
        <div className="mt-2">
          Correct Answer is:{q.answer ? "True" : "False"}
        </div>
      )}

      {q.type === "fitb" && (
        <div className="mt-2">
          Correct Answe is: {q.answer}
        </div>
      )}

      <Button
        variant="outline-danger"
        size="sm"
        onClick={() => handleDelete(q._id)}
        className="mt-3"
      >
        Delete
      </Button>
    </div>
  ))}
</Tab>

        </Tabs>
      </div>
    </Container>
  );
}