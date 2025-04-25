import { useEffect, useState } from "react";
import { Button, Form, Row, Col } from "react-bootstrap";
import { useParams, useNavigate } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import * as questionClient from "./client";

export default function MultipleChoiceEditor() {
  const { qid, cid } = useParams(); // qid = quiz id, cid = course id
  const navigate = useNavigate();

  const initial = {
    _id: uuidv4(),
    qid: "",
    qtitle: "",
    points: 0,
    question_text: "",
    answers: [
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
      { text: "", isCorrect: false },
    ],
    type: "mcq",
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
    fetchQuestions();
  }, [qid]);

  const setCorrectAnswer = (index: number) => {
    const updated = question.answers.map((a, i) => ({
      ...a,
      isCorrect: i === index,
    }));
    setQuestion({ ...question, answers: updated });
  };

  const updateChoice = (index: number, field: string, value: string) => {
    const updated = [...question.answers];
    updated[index] = { ...updated[index], [field]: value };
    setQuestion({ ...question, answers: updated });
  };

  const deleteAnswer = (index: number) => {
    if (window.confirm("Are you sure you'd like to delete this answer?")) {
      const updated = question.answers.filter((_, i) => i !== index);
      setQuestion({ ...question, answers: updated });
    }
  };

  const addAnswer = () => {
    setQuestion({
      ...question,
      answers: [...question.answers, { text: "", isCorrect: false }],
    });
  };

  const saveQuestion = async () => {
    await questionClient.createQuestionForQuiz(qid!, question);
    setQuestions([...questions, question]);
    navigate(`/Kambaz/Courses/${cid}/Quizzes`);
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
          onChange={(e) =>
            setQuestion({ ...question, points: Number(e.target.value) })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Question</Form.Label>
        <ReactQuill
          value={question.question_text}
          onChange={(value) =>
            setQuestion({ ...question, question_text: value })
          }
        />
      </Form.Group>

      <Form.Group className="mb-3">
        <Form.Label>Select Correct Answer</Form.Label>
        {question.answers.map((answer, index) => (
          <Row key={index} className="mb-2 align-items-center">
            <Col xs="auto">
              <Form.Check
                type="radio"
                name="correctAnswer"
                checked={answer.isCorrect}
                onChange={() => setCorrectAnswer(index)}
              />
            </Col>
            <Col>
              <Form.Control
                placeholder={`Answer ${index + 1}`}
                value={answer.text}
                onChange={(e) =>
                  updateChoice(index, "text", e.target.value)
                }
              />
            </Col>
            <Col xs="auto">
              <Button
                variant="outline-danger"
                onClick={() => deleteAnswer(index)}
              >
                Delete
              </Button>
            </Col>
          </Row>
        ))}
      </Form.Group>

      <Button variant="link" onClick={addAnswer} className="mb-3">
        + Add Additional Answer
      </Button>

      <div className="d-flex gap-2">
        <Button
          variant="outline-secondary"
          onClick={() =>
            navigate(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)
          }
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



// import { useEffect, useState } from "react";
// import { Button, Form, Row, Col } from "react-bootstrap";
// import { useParams, useNavigate } from "react-router-dom";
// import { v4 as uuidv4 } from "uuid";
// import ReactQuill from "react-quill";
// import "react-quill/dist/quill.snow.css";
// import * as questionClient from "./client";
// export default function MultipleChoiceEditor() {
//   const { qid, cid } = useParams(); //btw qid is quiz id, cid is course id!!!!
//   const n = useNavigate();

//   const initial = {
//     _id: uuidv4(),
//     qtitle: "",
//     points: 0,
//     question_text: "",
//     answers: [
//       { text: "", isCorrect: false },
//       { text: "", isCorrect: false },
//       { text: "", isCorrect: false },
//       { text: "", isCorrect: false },
//     ],
//   };

//   const [question, setQuestion] = useState(initial);
//   const [questions, setQuestions] = useState<any[]>([]);

//   const deleteAnswer = (index: any) => {
//     if (window.confirm("Are you sure you'd like to delete this answer?")) {
//       const updated = question.answers.filter((_, i) => i !== index);
//       setQuestion({ ...question, answers: updated });
//     }
//   };

//   const saveQuestion = async () => {
//     await questionClient.createQuestionForQuiz(qid!, question);
//     setQuestions([...questions, question]);
//     n(`/Kambaz/Courses/${cid}/Quizzes/${qid}`);
//   };

//   const addAnswer = () => {
//     setQuestion({...question, answers: [...question.answers, { text: "", isCorrect: false }],});
//   };

//   const updateAnswer = (index: number, field: "text", value: string) => {
//     const updated = [...question.answers];
//     updated[index][field] = value;
//     setQuestion({ ...question, answers: updated });
//   };
  
//   const setCorrectAnswer = (index: number) => {
//     const updated = question.answers.map((choice, i) => ({
//       ...choice,
//       isCorrect: i === index,
//     }));
//     setQuestion({ ...question, answers: updated });
//   };

//   useEffect(() => {
//     const fetchQuestions = async () => {
//     const quizQuestions = await questionClient.findQuestionsForQuiz(qid!);
//      if (Array.isArray(quizQuestions)) {
//         setQuestions(quizQuestions);
//         } else {
//           console.error("Expected an array but got:", quizQuestions);
//           setQuestions([]);
//         }
//     };
//     fetchQuestions();}, [qid]);

//   return (

//     <Form className="p-3">
//       <Form.Group className="mb-3">
//         <Form.Label>Question Title</Form.Label>
//         <Form.Control
//           type="text"
//           value={question.qtitle}
//           onChange={(e) => setQuestion({ ...question, qtitle: e.target.value })}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Points</Form.Label>
//         <Form.Control
//           type="number"
//           value={question.points}
//           onChange={(e) => setQuestion({ ...question, points: Number(e.target.value) })}
//         />
//       </Form.Group>

//       <Form.Group className="mb-3">
//         <Form.Label>Question</Form.Label>
//         <ReactQuill
//           value={question.question_text}
//           onChange={(value) => setQuestion({ ...question, question_text: value })}
//         />
//       </Form.Group>

//       <Form.Label>Answers</Form.Label>
//       {question.answers.map((answer, index) => (
//         <Row key={index} className="mb-2 align-items-center">
//           <Col >
          
//             <Form.Check
//               type="radio"
//               name="correctAnswer"
//               checked={answer.isCorrect}
//               onChange={() => setCorrectAnswer(index)}
//             />
//           </Col>
//           <Col>
//             <Form.Control
//               placeholder={`Add Answer Here`} value={answer.text} onChange={(e) => updateAnswer(index, "text", e.target.value)}
//             />
//           </Col>
//           <Col >
//             <Button variant="outline-danger" onClick={() => deleteAnswer(index)}>
//               Delete
//             </Button>
//           </Col>
//         </Row>
//       ))}

//       <Button variant="link" onClick={addAnswer} className="mb-3">
//         + Add Additional Answer
//       </Button>

//       <div className="d-flex gap-2">
//       <Button variant="outline-secondary" onClick={() => n(`/Kambaz/Courses/${cid}/Quizzes/${qid}`)}>
//         Cancel
//     </Button>

//         <Button variant="danger" onClick={saveQuestion}>
//           Update Question
//         </Button>
//       </div>
//     </Form>
//   );
// }