import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Define the structure of an Assignment
interface Assignment {
  _id: string;
  title: string;
  description: string;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
  points: number;
  course: string;
}

// Define initial state
interface AssignmentsState {
  assignments: Assignment[];
}

const initialState: AssignmentsState = {
  assignments: [], // start with an empty array
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // CREATE (Add a new assignment)
    addAssignment: (state, { payload }: PayloadAction<Omit<Assignment, '_id'>>) => {
      const newAssignment: Assignment = {
        _id: uuidv4(),  // generate a new unique ID
        title: payload.title,
        description: payload.description,
        dueDate: payload.dueDate,
        availableFrom: payload.availableFrom,
        availableUntil: payload.availableUntil,
        points: payload.points,
        course: payload.course,
      };
      state.assignments.push(newAssignment);
    },

    // DELETE (Remove an assignment by ID)
    deleteAssignment: (state, { payload }: PayloadAction<string>) => {
      state.assignments = state.assignments.filter((assignment) => assignment._id !== payload);
    },

    // UPDATE (Update an assignment based on its ID)
    updateAssignment: (state, { payload }: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((assignment) =>
        assignment._id === payload._id ? payload : assignment
      );
    },
  },
});

// Export actions
export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;

// Export reducer to be used in the store
export default assignmentsSlice.reducer;
