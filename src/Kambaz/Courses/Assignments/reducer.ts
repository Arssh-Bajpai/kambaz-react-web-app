// src/Kambaz/Courses/Assignments/reducer.ts
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
// Adjust this import if your assignments data is elsewhere
import initialAssignmentsData from "../../Database/assignments.json";

const initialState = {
  assignments: initialAssignmentsData,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, { payload }) => {
      const newAssignment = {
        _id: uuidv4(),
        course: payload.course,
        name: payload.name || "New Assignment",
        description: payload.description || "",
        points: payload.points || 100,
        dueDate: payload.dueDate || "",
        availableFrom: payload.availableFrom || "",
        availableUntil: payload.availableUntil || "",
      };
      state.assignments.push(newAssignment);
    },
    updateAssignment: (state, { payload }) => {
      state.assignments = state.assignments.map((a) =>
        a._id === payload._id ? payload : a
      );
    },
    deleteAssignment: (state, { payload: assignmentId }) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== assignmentId
      );
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
