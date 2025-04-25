import axios from "axios";

// Define the API endpoint for quizzes
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

// Function to fetch all questions for a given quiz
export const findQuestionsForQuiz = async (quizId: string) => {
  try {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
  } catch (error) {
    console.error("Error fetching questions for quiz:", error);
    throw new Error("Failed to fetch questions.");
  }
};

// Function to create a new question for a specific quiz
export const createQuestionForQuiz = async (quizId: string, question: any) => {
  try {
    const response = await axios.post(`${QUIZZES_API}/${quizId}/questions`, question);
    return response.data;
  } catch (error) {
    console.error("Error creating question:", error);
    throw new Error("Failed to create question.");
  }
};

// Function to delete a specific question from a quiz
export const deleteQuizQuestion = async (quizId: string, questionId: string) => {
  try {
    const response = await axios.delete(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting question:", error);
    throw new Error("Failed to delete question.");
  }
};

// Function to fetch a specific question by its ID
export const findQuestionById = async (quizId: string, questionId: string) => {
  try {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/questions/${questionId}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching question:", error);
    throw new Error("Failed to fetch question.");
  }
};

// Function to update a question in a quiz
export const updateQuestion = async (quizId: string, questionId: string, question: any) => {
  try {
    const response = await axios.put(`${QUIZZES_API}/${quizId}/questions/${questionId}`, question);
    return response.data;
  } catch (error) {
    console.error("Error updating question:", error);
    throw new Error("Failed to update question.");
  }
};

// Function to handle the question save process (whether it's creating or updating)
export const saveQuestion = async (quizId: string, questionId: string, question: any) => {
  if (questionId === "new") {
    return createQuestionForQuiz(quizId, question); // create new question if no questionId
  } else {
    return updateQuestion(quizId, questionId, question); // update existing question
  }
};
