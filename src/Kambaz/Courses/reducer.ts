// src/Kambaz/Courses/reducer.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

// Define the Course interface
export interface Course {
  _id: string;
  name: string;
  description: string;
  enrolledUsers: string[]; // list of user IDs
}

interface CoursesState {
  courses: Course[];
}

// Seed the store with a couple of example courses
const initialState: CoursesState = {
  courses: [
    {
      _id: uuidv4(),
      name: "Introduction to React",
      description: "Learn the basics of React.",
      enrolledUsers: [],
    },
    {
      _id: uuidv4(),
      name: "Advanced Redux",
      description: "Deep dive into Redux architecture.",
      enrolledUsers: [],
    },
  ],
};

const coursesSlice = createSlice({
  name: "courses",
  initialState,
  reducers: {
    enrollCourse(
      state,
      action: PayloadAction<{ courseId: string; userId: string }>
    ) {
      const { courseId, userId } = action.payload;
      const course = state.courses.find((c) => c._id === courseId);
      if (course && !course.enrolledUsers.includes(userId)) {
        course.enrolledUsers.push(userId);
      }
    },
    unenrollCourse(
      state,
      action: PayloadAction<{ courseId: string; userId: string }>
    ) {
      const { courseId, userId } = action.payload;
      const course = state.courses.find((c) => c._id === courseId);
      if (course) {
        course.enrolledUsers = course.enrolledUsers.filter((id) => id !== userId);
      }
    },
    // Additional actions if you want them (addCourse, updateCourse, etc.)
  },
});

export const { enrollCourse, unenrollCourse } = coursesSlice.actions;
export default coursesSlice.reducer;
