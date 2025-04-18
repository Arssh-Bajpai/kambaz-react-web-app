import { createSlice } from "@reduxjs/toolkit";
import { courses as initialCourses } from "./../Database";

const initialState = {
  courses: initialCourses,
};

const courseSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    addCourse: (state, { payload: course }) => {
      state.courses = [...state.courses, course];
    },

    deleteCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.filter((c: any) => c._id !== courseId);
    },

    updateCourse: (state, { payload: course }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === course._id ? course : c
      );
    },

    editCourse: (state, { payload: courseId }) => {
      state.courses = state.courses.map((c: any) =>
        c._id === courseId ? { ...c, editing: true } : c
      );
    },
  },
});

export const { addCourse, deleteCourse, updateCourse, editCourse } = courseSlice.actions;

export default courseSlice.reducer;