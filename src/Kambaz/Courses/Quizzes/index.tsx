import { useEffect, useState } from "react";
import { Link, useParams, useNavigate, useLocation } from "react-router-dom";
import { Button, ListGroup, Dropdown } from "react-bootstrap";
import { BsGripVertical, BsThreeDotsVertical } from "react-icons/bs";
import { CiSearch } from "react-icons/ci";
import { FaBan, FaCheckCircle } from "react-icons/fa";
import * as quizClient from "./client.ts";
import QuizControl from "./QuizControl";

export default function Quizzes() {
  const { cid } = useParams();
  const n = useNavigate();
  const location = useLocation(); 
  const [quizzes, setQuizzes] = useState<any[]>([]);

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const courseQuizzes = await quizClient.findQuizzesForCourse(cid!);
        if (Array.isArray(courseQuizzes)) {
          setQuizzes(courseQuizzes);
        } else {
          console.error("Expected an array but got:", courseQuizzes);
          setQuizzes([]);
        }
      } catch (err) {
        console.error("Failed to fetch quizzes:", err);
        setQuizzes([]);
      }
    };
    fetchQuizzes();
  }, [cid, location.key]); 

  const deleteQuiz = async (quizId: string) => {
    if (window.confirm("Are you sure you'd like to delete?")) {
      await quizClient.deleteQuiz(quizId);
      setQuizzes(quizzes.filter((q) => q._id !== quizId));
    }
  };

  const togglePublish = async (quizId: string) => {
    try {
      const res = await quizClient.togglePublish(quizId);
      setQuizzes((prev) =>
        prev.map((q) =>
          q._id === quizId ? { ...q, published: res.published } : q
        )
      );
    } catch (e) {
      console.error("Failed to toggle publish status", e);
    }
  };

  return (
    <div id="wd-quizzes" className="container">
      <div
        id="search-buttons-top"
        className="d-flex justify-content-between align-items-center gap-2"
      >
        <div className="search-quiz justify-content-start d-flex align-items-center">
          <CiSearch />
          <input
            placeholder="Search for Quizzes"
            id="wd-search-quiz"
            className="search-input ms-2"
          />
        </div>
        <div className="right-aligned-buttons justify-content-end">
          <Button
            size="lg"
            className="me-1 float-end"
            id="wd-add-quiz-group"
            variant="outline-secondary"
          >
            + Group
          </Button>

          <Button
            size="lg"
            className="me-1 float-end"
            id="wd-add-quiz"
            variant="danger"
            onClick={() => n(`/Kambaz/Courses/${cid}/Quizzes/new`)}
          >
            + Quiz
          </Button>
        </div>
      </div>

      <ListGroup className="rounded-0" id="wd-modules">
        <ListGroup.Item className="wd-module p-0 mb-5 fs-5 border-gray">
          <div className="wd-title p-3 ps-2 bg-secondary d-flex align-items-center">
            <BsGripVertical className="me-2 fs-3" /> Quizzes
            <span
              id="wd-quizzes-percentage"
              className="border rounded-pill px-3 py-1 text-muted ms-auto"
            >
              20% of Total
            </span>
            <QuizControl />
          </div>

          <ListGroup className="wd-lessons rounded-0 quiz-item">
            {Array.isArray(quizzes) &&
              quizzes.map((quiz) => (
                <ListGroup.Item
                  key={quiz._id}
                  className="wd-lesson p-3 ps-1 d-flex flex-column"
                >
                  <div className="d-flex align-items-center">
                    <BsGripVertical className="me-2 fs-3" />
                    <Link
                      to={`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}/preview`}
                      className="wd-quiz-link fw-bold"
                    >
                      {quiz.title}
                    </Link>
                  </div>

                  <div className="d-flex align-items-center justify-content-between mt-2">
                    <span className="text-muted">
                      <span className="text-danger">{quiz.module}</span> |{" "}
                      <b>Available:</b> {quiz.available} | <b>Due:</b>{" "}
                      {quiz.due} | {quiz.points} pts
                    </span>

                    <div className="d-flex align-items-center gap-2">
                      <span
                        role="button"
                        className="text-muted fs-4"
                        title={quiz.published ? "Unpublish Quiz" : "Publish Quiz"}
                        onClick={() => togglePublish(quiz._id)}
                      >
                        {quiz.published ? (
                          <FaCheckCircle className="text-success" />
                        ) : (
                          <FaBan className="text-danger" />
                        )}
                      </span>

                      <Dropdown align="end">
                        <Dropdown.Toggle
                          variant="light"
                          className="border-0 bg-transparent p-0"
                        >
                          <BsThreeDotsVertical className="fs-5" />
                        </Dropdown.Toggle>

                        <Dropdown.Menu>
                          <Dropdown.Item
                            onClick={() =>
                              n(`/Kambaz/Courses/${cid}/Quizzes/${quiz._id}`)
                            }
                          >
                            Edit
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => deleteQuiz(quiz._id)}
                            className="text-danger"
                          >
                            Delete
                          </Dropdown.Item>
                          <Dropdown.Item
                            onClick={() => togglePublish(quiz._id)}
                          >
                            {quiz.published ? "Unpublish" : "Publish"}
                          </Dropdown.Item>
                        </Dropdown.Menu>
                      </Dropdown>
                    </div>
                  </div>
                </ListGroup.Item>
              ))}
          </ListGroup>
        </ListGroup.Item>
      </ListGroup>
    </div>
  );
}
