import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentReducer from "./Courses/Assignments/reducer"
const store = configureStore({
  reducer: {
    modulesReducer,
    assignmentReducer,
    accountReducer,
  },
});
export default store;