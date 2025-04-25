// import React, { useState } from "react";
// import { Button, Form } from "react-bootstrap";

// // Define the types for props
// interface Answer {
//   text: string;
//   isCorrect: boolean;
// }

// interface Question {
//   text: string;
//   answers: Answer[];
// }

// interface MultipleChoiceEditorProps {
//   question: Question;
//   onSave: (question: Question) => void;
//   onCancel: () => void;
// }

// export default function MultipleChoiceEditor({ question, onSave, onCancel }: MultipleChoiceEditorProps) {
//   const [questionText, setQuestionText] = useState<string>(question ? question.text : "");
//   const [answers, setAnswers] = useState<Answer[]>(question ? question.answers : [{ text: "", isCorrect: false }]);

//   const handleAnswerChange = (index: number, field: string, value: string | boolean) => {
//     const newAnswers = [...answers];
//     newAnswers[index][field as keyof Answer] = value;
//     setAnswers(newAnswers);
//   };

//   const addAnswer = () => {
//     setAnswers([...answers, { text: "", isCorrect: false }]);
//   };

//   const removeAnswer = (index: number) => {
//     const newAnswers = answers.filter((_, idx) => idx !== index);
//     setAnswers(newAnswers);
//   };

//   const handleSave = () => {
//     onSave({ text: questionText, answers });
//   };

//   return (
//     <div>
//       <Form.Group className="mb-3">
//         <Form.Label>Question Text</Form.Label>
//         <Form.Control
//           type="text"
//           value={questionText}
//           onChange={(e) => setQuestionText(e.target.value)}
//           placeholder="Enter your question here"
//         />
//       </Form.Group>

//       {answers.map((answer, index) => (
//         <div key={index} className="mb-3">
//           <Form.Group>
//             <Form.Control
//               type="text"
//               value={answer.text}
//               onChange={(e) => handleAnswerChange(index, "text", e.target.value)}
//               placeholder={`Answer ${index + 1}`}
//             />
//           </Form.Group>
//           <Form.Check
//             type="checkbox"
//             label="Correct Answer"
//             checked={answer.isCorrect}
//             onChange={() => handleAnswerChange(index, "isCorrect", !answer.isCorrect)}
//           />
//           {answers.length > 2 && (
//             <Button variant="danger" size="sm" onClick={() => removeAnswer(index)}>
//               Remove Answer
//             </Button>
//           )}
//         </div>
//       ))}

//       <Button variant="outline-primary" onClick={addAnswer}>
//         Add Another Answer
//       </Button>

//       <div className="mt-3">
//         <Button variant="success" onClick={handleSave}>
//           Save Question
//         </Button>
//         <Button variant="outline-secondary" onClick={onCancel} className="ms-2">
//           Cancel
//         </Button>
//       </div>
//     </div>
//   );
// }
