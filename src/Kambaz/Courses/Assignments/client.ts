import axios from "axios";
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const COURSES_API = `${REMOTE_SERVER}/api/courses`;
const ASSIGNMENTS_API = `${REMOTE_SERVER}/api/assignments`;

export const fetchAllAssignments = async () => {
  const { data } = await axios.get(ASSIGNMENTS_API);
  return data;
};

export const deleteAssignment = async (id: string) => {
  const { data } = await axios.delete(`${ASSIGNMENTS_API}/${id}`);
  return data;
};

export const findAssignment = async (assignmentId: string) => {
    const response = await axios.get(`${ASSIGNMENTS_API}/${assignmentId}`);
    return response.data;
  };

  export const updateAssignment = async (assignment: any) => {
    const { data } = await axios.put(
      `${REMOTE_SERVER}/api/assignments/${assignment._id}`,
      assignment
    );
    return data;
  };
  

export const findAssignmentsForCourse = async (courseId: string) => {
  const response = await axios
  .get(`${COURSES_API}/${courseId}/assignments`);
  return response.data;
};

export const createAssignmentForCourse = async (courseId: string, assignment: any) => {
  const response = await axios.post(
`${COURSES_API}/${courseId}/assignments`, 
  assignment);
  return response.data;
};