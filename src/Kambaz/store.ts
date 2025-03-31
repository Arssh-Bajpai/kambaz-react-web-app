// src/Kambaz/store.ts
import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "./Courses/Modules/reducer";
import accountReducer from "./Account/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";

const store = configureStore({
  reducer: {
    account: accountReducer,
    modules: modulesReducer,
    assignments: assignmentsReducer, // added assignments slice
    // add other reducers as needed
  },
});

export default store;