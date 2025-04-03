// src/Kambaz/store.ts
import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer, FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER } from "redux-persist";
import storage from "redux-persist/lib/storage"; // uses localStorage for web
import accountReducer from "./Account/reducer";
import modulesReducer from "./Courses/Modules/reducer";
import coursesReducer from "./Courses/reducer";
import assignmentsReducer from "./Courses/Assignments/reducer";

// Combine your reducers into a root reducer
const rootReducer = combineReducers({
  account: accountReducer,
  modules: modulesReducer,
  courses: coursesReducer,
  assignments: assignmentsReducer,
});

// Configure persist settings: whitelist the slices you want to persist.
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["account", "modules", "courses", "assignments"],
};

const persistedReducer = persistReducer(persistConfig, rootReducer);

const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        // Ignore redux-persist action types
        ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
      },
    }),
});

export const persistor = persistStore(store);
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
