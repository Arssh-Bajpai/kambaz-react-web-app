import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import * as quizClient from "./client";
import { Container, Form, Button, Alert } from "react-bootstrap";

export default function TakeQuiz() {
  const { qid } = useParams();
  const [quiz, setQuiz] = useState<any>(null);
  const [questions, setQuestions] = useState<any[]>([]);
  const [answers, setAnswers] = useState<any>({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      if (qid) {
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
      await quizClient.submitAttempt(qid!, total);
      const updated = await quizClient.findQuiz(qid!);
      setQuiz(updated);
    } catch (err) {
      console.error("Error submitting attempt:", err);
    }
  };

  if (!quiz) return <div>Loading...</div>;

  const usedAttempts = quiz.attempts?.length || 0;
  const maxAllowed = quiz.maxAttempts ?? Infinity;
  const canRetry = usedAttempts < maxAllowed;

  return (
    <Container className="p-4">
      <h2>{quiz.title}</h2>
      <p>{quiz.description}</p>

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
        </div>
      ))}

      {!submitted ? (
        <Button variant="success" onClick={handleSubmit}>
          Submit Quiz
        </Button>
      ) : (
        <>
          <Alert variant="info">
            You scored <strong>{score}</strong> / {quiz.points} points.
          </Alert>
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
        </>
      )}
    </Container>
  );
}