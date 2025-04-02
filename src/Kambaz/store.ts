// store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import assignmentsReducer from "./Courses/Assignments/reducer"; // combined slices
import accountReducer from "./Account/reducer";
import modulesReducer from "./Courses/Modules/reducer";

const rootReducer = combineReducers({
  account: accountReducer,
  modules: modulesReducer,
  assignments: assignmentsReducer, // the combined reducer is at `state.assignments`
});

const store = configureStore({ reducer: rootReducer });
export default store;
