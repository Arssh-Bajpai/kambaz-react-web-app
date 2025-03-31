// src/Kambaz/Courses/Assignments/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { assignments as dbAssignments } from "../../Database"; // adjust path as needed
import { v4 as uuidv4 } from "uuid";

const initialState = {
  assignments: dbAssignments, // initialize with your database assignments
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload: assignment }) => {
      const newAssignment = {
        _id: uuidv4(),
        name: assignment.name,
        description: assignment.description,
        points: assignment.points,
        dueDate: assignment.dueDate,
        availableFrom: assignment.availableFrom,
        availableUntil: assignment.availableUntil,
        // add additional fields as needed
      };
      state.assignments = [...state.assignments, newAssignment];
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a: any) => a._id !== assignmentId
      );
    },
    updateAssignment: (state, { payload: updatedAssignment }) => {
      state.assignments = state.assignments.map((a: any) =>
        a._id === updatedAssignment._id ? updatedAssignment : a
      );
    },
    // Optionally, add an "editAssignment" to toggle edit mode if needed.
  },
});

export const { addAssignment, deleteAssignment, updateAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
