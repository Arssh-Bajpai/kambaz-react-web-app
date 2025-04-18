import { configureStore } from "@reduxjs/toolkit";
import assignmentsReducer from "./Courses/Assignments/reducer";
import accountReducer from "./Account/reducer";
import modulesReducer from "./Courses/Modules/reducer";

const store = configureStore({
  reducer: {
    assignmentsReducer,  // ensure you're using the correct reducer name
    accountReducer,
    modulesReducer,
  },
});

export default store;
