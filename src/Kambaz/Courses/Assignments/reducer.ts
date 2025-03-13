import { createSlice } from "@reduxjs/toolkit";
import assignmentsData from "../../Database/assignments.json";

// Define initial state using assignments data
const initialState = {
  assignments: assignmentsData,
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    addAssignment: (state, action) => {
      state.assignments.push(action.payload);
    },
    updateAssignment: (state, action) => {
      const index = state.assignments.findIndex((a) => a._id === action.payload._id);
      if (index !== -1) {
        state.assignments[index] = action.payload;
      }
    },
    deleteAssignment: (state, action) => {
      state.assignments = state.assignments.filter((a) => a._id !== action.payload);
    },
  },
});

export const { addAssignment, updateAssignment, deleteAssignment } = assignmentsSlice.actions;
export default assignmentsSlice.reducer;
