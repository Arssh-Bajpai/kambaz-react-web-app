import axios from "axios";
axios.defaults.withCredentials = true;
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const USERS_API = `${REMOTE_SERVER}/api/users`;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;

export const enrollUserInCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.post(
    `${USERS_API}/${userId}/courses/${courseId}/enroll`);
  return data;
};

export const unenrollUserFromCourse = async (userId: string, courseId: string) => {
  const { data } = await axios.delete(`${USERS_API}/${userId}/courses/${courseId}/unenroll`);
  return data;
};

export const findCoursesForUser = async (userId: string) => {
  const { data } = await axios.get(`${USERS_API}/${userId}/courses`);
  return data;
};

export const findUsersForCourse = async (courseId: string) => {
  const { data } = await axios.get(`${COURSES_API}/${courseId}/users`);
  return data;
};