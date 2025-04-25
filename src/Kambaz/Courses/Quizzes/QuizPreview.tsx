import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import * as quizClient from "./client";
import { Container, Form, Button, Alert, Row, Col } from "react-bootstrap";

export default function QuizPreview() {
  const { qid, cid } = useParams();
  const navigate = useNavigate();

  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (qid) {
        console.log("🧪 QuizPreview loaded with qid:", qid);
        const q = await quizClient.findQuiz(qid);
        const qs = await quizClient.findQuestionsForQuiz(qid);
        setQuiz(q);
        setQuestions(qs);
      }
    };
    loadData();
  }, [qid]);

  const handleChange = (id: string, value: any) => {
    setAnswers({ ...answers, [id]: value });
  };

  const handleSubmit = async () => {
    let total = 0;
    for (let q of questions) {
      const a = answers[q._id];
      if (q.type === "mcq") {
        const correct = q.answers.findIndex((ans: any) => ans.isCorrect);
        if (a === correct) total += q.points;
      } else if (q.type === "tf") {
        if (a === q.answer) total += q.points;
      } else if (q.type === "fitb") {
        if (a?.toLowerCase().trim() === q.answer.toLowerCase().trim()) {
          total += q.points;
        }
      }
    }

    setScore(total);
    setSubmitted(true);

    try {
      console.log("🔍 Submitting attempt:", { qid, score: total });
      await quizClient.submitAttempt(qid!, total);
      const updatedQuiz = await quizClient.findQuiz(qid!);
      setQuiz(updatedQuiz);
      console.log("Attempt submitted successfully");
    } catch (err) {
      console.error("Error submitting attempt:", err);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  const usedAttempts = quiz.attempts?.length || 0;
  const maxAllowed = quiz.maxAttempts ?? Infinity;
  const canRetry = quiz.multipleAttempts && usedAttempts < maxAllowed;

  return (
    <Container className="p-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <div>
          <h2>{quiz.title}</h2>
          <p>{quiz.description}</p>
        </div>
        <Button onClick={() => navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}/edit`)}>
          Edit Quiz
        </Button>
      </div>

      {/* Display quiz settings */}
      <Row className="mb-3">
        <Col><strong>Quiz Type:</strong> {quiz.quizType}</Col>
        <Col><strong>Points:</strong> {quiz.points}</Col>
        <Col><strong>Assignment Group:</strong> {quiz.assignmentGroup}</Col>
      </Row>
      <Row className="mb-3">
        <Col><strong>Shuffle Answers:</strong> {quiz.shuffleAnswers ? "Yes" : "No"}</Col>
        <Col><strong>Time Limit:</strong> {quiz.timeLimit} minutes</Col>
        <Col><strong>Multiple Attempts:</strong> {quiz.multipleAttempts ? "Yes" : "No"}</Col>
      </Row>
      <Row className="mb-3">
        <Col><strong>Show Correct Answers:</strong> {quiz.showCorrectAnswers}</Col>
        <Col><strong>One Question at a Time:</strong> {quiz.oneQuestionAtATime ? "Yes" : "No"}</Col>
        <Col><strong>Webcam Required:</strong> {quiz.webcamRequired ? "Yes" : "No"}</Col>
      </Row>
      <Row className="mb-3">
        <Col><strong>Lock Questions After Answering:</strong> {quiz.lockQuestionsAfterAnswering ? "Yes" : "No"}</Col>
      </Row>

      {/* Display question list */}
      {questions.map((q, idx) => (
        <div key={q._id} className="border rounded p-3 mb-3">
          <h5>{idx + 1}. {q.qtitle}</h5>
          <div dangerouslySetInnerHTML={{ __html: q.question_text }} />

          {q.type === "mcq" &&
            q.answers.map((a: any, i: number) => (
              <Form.Check
                key={i}
                type="radio"
                name={q._id}
                label={a.text}
                disabled={submitted}
                checked={answers[q._id] === i}
                onChange={() => handleChange(q._id, i)}
              />
            ))}

          {q.type === "tf" && (
            <>
              <Form.Check
                type="radio"
                label="True"
                name={q._id}
                disabled={submitted}
                checked={answers[q._id] === true}
                onChange={() => handleChange(q._id, true)}
              />
              <Form.Check
                type="radio"
                label="False"
                name={q._id}
                disabled={submitted}
                checked={answers[q._id] === false}
                onChange={() => handleChange(q._id, false)}
              />
            </>
          )}

          {q.type === "fitb" && (
            <Form.Control
              type="text"
              disabled={submitted}
              value={answers[q._id] || ""}
              onChange={(e) => handleChange(q._id, e.target.value)}
              className="mt-2"
              placeholder="Type your answer"
            />
          )}

          {submitted && (
            <div className="mt-2">
              {(() => {
                const a = answers[q._id];
                let correct = false;
                if (q.type === "mcq") {
                  const correctIdx = q.answers.findIndex((a: any) => a.isCorrect);
                  correct = a === correctIdx;
                } else if (q.type === "tf") {
                  correct = a === q.answer;
                } else if (q.type === "fitb") {
                  correct = a?.toLowerCase().trim() === q.answer.toLowerCase().trim();
                }
                return (
                  <span className={correct ? "text-success" : "text-danger"}>
                    {correct ? "Correct" : `Incorrect (Answer: ${q.type === "mcq" ? q.answers.find((a: any) => a.isCorrect)?.text : q.answer})`}
                  </span>
                );
              })()}
            </div>
          )}
        </div>
      ))}

      {/* Submit or review results */}
      {submitted ? (
        <div className="mt-3">
          <Alert variant="info">
            You scored <strong>{score}</strong> / {quiz.points} points.
          </Alert>

          <p>
            Attempts used: <strong>{usedAttempts}</strong> /{" "}
            {maxAllowed === Infinity ? "∞" : maxAllowed}
          </p>

          {canRetry ? (
            <Button
              variant="warning"
              onClick={() => {
                setAnswers({});
                setSubmitted(false);
                setScore(0);
              }}
            >
              Re-Attempt Quiz
            </Button>
          ) : (
            <Alert variant="warning" className="mt-3">
              You’ve reached the maximum number of attempts.
            </Alert>
          )}
        </div>
      ) : (
        <Button variant="success" onClick={handleSubmit}>
          Submit Preview
        </Button>
      )}

      {quiz.attempts?.length > 0 && (
        <div className="mt-5">
          <h4>📜 Attempt History</h4>
          <ul className="list-group">
            {quiz.attempts.map((a: any, i: number) => (
              <li key={a._id} className="list-group-item d-flex justify-content-between">
                <span>Attempt {i + 1}</span>
                <span>
                  <strong>{a.score}</strong> pts on{" "}
                  {new Date(a.submittedAt).toLocaleString()}
                </span>
              </li>
            ))}
          </ul>
        </div>
      )}
    </Container>
  );
}