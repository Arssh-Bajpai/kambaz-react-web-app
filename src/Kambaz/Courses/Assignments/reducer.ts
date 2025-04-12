// src/Kambaz/Courses/Assignments/reducer.ts
import { createSlice, PayloadAction, combineReducers } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";
import initialAssignmentsData from "../../Database/assignments";

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
// Assignments Slice
// -----------------------
interface AssignmentsState {
  assignments: Assignment[];
}

const initialAssignmentsState: AssignmentsState = {
  assignments: (initialAssignmentsData as any[]).map((item) => ({
    _id: item._id,
    name: item.title || item.name || "Untitled Assignment",
    course: item.course || "",
    description: item.description || "",
    points: item.points || 100,
    dueDate: item.dueDate || "",
    availableFrom: item.availableFrom || "",
    availableUntil: item.availableUntil || "",
  })),
};

const assignmentsSlice = createSlice({
  name: "assignments",
  initialState: initialAssignmentsState,
  reducers: {
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
  },
});

// -----------------------
// UI Slice
// -----------------------
interface UIState {
  showAssignmentCreator: boolean;
  showAssignmentEditor: boolean;
  assignmentToEdit: Assignment | null;
  assignmentSearchTerm: string;
}

const initialUIState: UIState = {
  showAssignmentCreator: false,
  showAssignmentEditor: false,
  assignmentToEdit: null,
  assignmentSearchTerm: "",
};

const uiSlice = createSlice({
  name: "ui",
  initialState: initialUIState,
  reducers: {
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

// Export assignment and UI actions if needed:
export const { addAssignment, updateAssignment, deleteAssignment } =
  assignmentsSlice.actions;
export const {
  openAssignmentCreator,
  closeAssignmentCreator,
  openAssignmentEditor,
  closeAssignmentEditor,
  setAssignmentSearchTerm,
} = uiSlice.actions;

// Combine both slices into a single reducer
const combinedReducer = combineReducers({
  assignments: assignmentsSlice.reducer,
  ui: uiSlice.reducer,
});

// Export the combined reducer as default
export default combinedReducer;
