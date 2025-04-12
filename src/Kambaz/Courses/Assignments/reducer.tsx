// src/Kambaz/Courses/Assignments/reducer.tsx
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// -----------------------
// Assignment Interface
// -----------------------
export interface Assignment {
  _id: string;
  name: string;
  course: string;
  description: string;
  points: number;
  dueDate: string;
  availableFrom: string;
  availableUntil: string;
}

// -----------------------
// State Interfaces
// -----------------------
interface AssignmentsState {
  assignments: Assignment[];
}

interface UIState {
  showAssignmentCreator: boolean;
  showAssignmentEditor: boolean;
  assignmentToEdit: Assignment | null;
  assignmentSearchTerm: string;
}

// Combined state for the assignments module
export interface AssignmentsModuleState extends AssignmentsState, UIState {}

// -----------------------
// Initial State
// -----------------------
const initialState: AssignmentsModuleState = {
  assignments: [], // Removed database import dependency
  showAssignmentCreator: false,
  showAssignmentEditor: false,
  assignmentToEdit: null,
  assignmentSearchTerm: "",
};

// -----------------------
// Combined Slice
// -----------------------
const assignmentsReducer = createSlice({
  name: "assignments",
  initialState,
  reducers: {
    // Data reducers
    addAssignment: (
      state,
      action: PayloadAction<Partial<Assignment> & { course: string }>
    ) => {
      const assignmentsForCourse = state.assignments.filter(
        (a) => a.course === action.payload.course
      );
      const defaultName =
        action.payload.name && action.payload.name.trim() !== ""
          ? action.payload.name
          : `Assignment ${assignmentsForCourse.length + 1}`;

      const newAssignment: Assignment = {
        _id: uuidv4(),
        course: action.payload.course,
        name: defaultName,
        description: action.payload.description || "",
        points: action.payload.points || 100,
        dueDate: action.payload.dueDate || "",
        availableFrom: action.payload.availableFrom || "",
        availableUntil: action.payload.availableUntil || "",
      };

      state.assignments.push(newAssignment);
    },
    updateAssignment: (state, action: PayloadAction<Assignment>) => {
      state.assignments = state.assignments.map((a) =>
        a._id === action.payload._id ? action.payload : a
      );
    },
    deleteAssignment: (state, action: PayloadAction<string>) => {
      state.assignments = state.assignments.filter(
        (a) => a._id !== action.payload
      );
    },
    // UI reducers
    openAssignmentCreator(state) {
      state.showAssignmentCreator = true;
    },
    closeAssignmentCreator(state) {
      state.showAssignmentCreator = false;
    },
    openAssignmentEditor(state, action: PayloadAction<Assignment>) {
      state.assignmentToEdit = action.payload;
      state.showAssignmentEditor = true;
    },
    closeAssignmentEditor(state) {
      state.showAssignmentEditor = false;
      state.assignmentToEdit = null;
    },
    setAssignmentSearchTerm(state, action: PayloadAction<string>) {
      state.assignmentSearchTerm = action.payload;
    },
  },
});

// Export actions to be used in your UI components
export const {
  addAssignment,
  updateAssignment,
  deleteAssignment,
  openAssignmentCreator,
  closeAssignmentCreator,
  openAssignmentEditor,
  closeAssignmentEditor,
  setAssignmentSearchTerm,
} = assignmentsReducer.actions;

// Export the reducer as default
export default assignmentsReducer.reducer;
