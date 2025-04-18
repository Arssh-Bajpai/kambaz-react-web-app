import axios from "axios";

const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;
const axiosWithCreds = axios.create({ withCredentials: true });

/** ---------- ASSIGNMENTS BY COURSE ---------- **/

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axiosWithCreds.get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axiosWithCreds.post(`${COURSES_API}/${courseId}/assignments`, assignment);
  return response.data;
};

/** ---------- INDIVIDUAL ASSIGNMENTS ---------- **/

export const findAssignment = async (assignmentId: string) => {
  const response = await axiosWithCreds.get(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment: any) => {
  const response = await axiosWithCreds.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};

export const deleteAssignment = async (assignmentId: string) => {
  const response = await axiosWithCreds.delete(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

/** ---------- OPTIONAL: ADMIN-STYLE FUNCTIONS ---------- **/

export const fetchAllAssignments = async () => {
  const response = await axiosWithCreds.get(ASSIGNMENTS_API);
  return response.data;
};
