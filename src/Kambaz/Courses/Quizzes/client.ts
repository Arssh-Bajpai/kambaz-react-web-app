import axios from "axios";
axios.defaults.withCredentials = true;

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const QUIZZES_API = `${REMOTE_SERVER}/api/quizzes`;

export const fetchAllQuizzes = async () => {
  try {
    const { data } = await axios.get(QUIZZES_API);
    return data;
  } catch (error) {
    console.error("Error fetching all quizzes:", error);
    throw error;
  }
};

export const findQuiz = async (quizId: string) => {
  try {
    const response = await axios.get(`${QUIZZES_API}/${quizId}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quiz with id ${quizId}:`, error);
    throw error;
  }
};

export const createQuizForCourse = async (courseId: string, quiz: any) => {
  try {
    const response = await axios.post(`${COURSES_API}/${courseId}/quizzes`, quiz);
    return response.data;
  } catch (error) {
    console.error(`Error creating quiz for course ${courseId}:`, error);
    throw error;
  }
};

export const updateQuiz = async (quiz: any) => {
  try {
    const { data } = await axios.put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return data;
  } catch (error) {
    console.error(`Error updating quiz with id ${quiz._id}:`, error);
    throw error;
  }
};

export const deleteQuiz = async (id: string) => {
  try {
    const { data } = await axios.delete(`${QUIZZES_API}/${id}`);
    return data;
  } catch (error) {
    console.error(`Error deleting quiz with id ${id}:`, error);
    throw error;
  }
};

export const togglePublish = async (quizId: string) => {
  try {
    const { data } = await axios.put(`${QUIZZES_API}/${quizId}/toggle`);
    return data;
  } catch (error) {
    console.error(`Error toggling publish status for quiz with id ${quizId}:`, error);
    throw error;
  }
};

export const findQuizzesForCourse = async (courseId: string) => {
  try {
    const response = await axios.get(`${COURSES_API}/${courseId}/quizzes`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching quizzes for course ${courseId}:`, error);
    throw error;
  }
};

export const findQuestionsForQuiz = async (qid: string) => {
  try {
    const res = await axios.get(`${QUIZZES_API}/${qid}/questions`);
    return res.data;
  } catch (error) {
    console.error(`Error fetching questions for quiz ${qid}:`, error);
    throw error;
  }
};

export const deleteQuestion = async (qid: string, questionId: string) => {
  try {
    await axios.delete(`${QUIZZES_API}/${qid}/questions/${questionId}`);
  } catch (error) {
    console.error(`Error deleting question with id ${questionId} from quiz ${qid}:`, error);
    throw error;
  }
};

export const submitAttempt = async (quizId: string, score: number) => {
  try {
    const { data } = await axios.post(`${QUIZZES_API}/${quizId}/attempts`, {
      score,
    });
    return data;
  } catch (error) {
    console.error(`Error submitting attempt for quiz ${quizId}:`, error);
    throw error;
  }
};
