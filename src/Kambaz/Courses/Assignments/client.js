import axios from "axios";
const axiosWithCredentials = axios.create({ withCredentials: true });
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
export const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const deleteAssignment = async (assignmentId) => {
  const response = await axiosWithCredentials.post(`${ASSIGNMENTS_API}/${assignmentId}`);
  return response.data;
};

export const updateAssignment = async (assignment) => {
  const response = await axios.put(`${ASSIGNMENTS_API}/${assignment._id}`, assignment);
  return response.data;
};

export const createAssignment = async (assignment) => {
  const response = await axiosWithCredentials.post(`${ASSIGNMENTS_API}`, assignment);
  return response.data;
};
