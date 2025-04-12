// reducer.tsx
import { createSlice } from "@reduxjs/toolkit";
import { v4 as uuidv4 } from "uuid";

/**
 * Define a module type (optional, but helpful for clarity)
 */
interface Module {
  _id: string;
  lessons: any[];
  name: string;
  course: string;
  editing?: boolean;
}

/**
 * Shape of the modules slice
 */
interface ModulesState {
  modules: Module[];
}

/**
 * Initialize the modules array as empty
 * (populated later via setModules from the server)
 */
const initialState: ModulesState = {
  modules: [],
};

const modulesSlice = createSlice({
  name: "modules",
  initialState,
  reducers: {
    /**
     * Replaces the entire modules array with what was retrieved from the server
     */
    setModules: (state, { payload: modules }: { payload: Module[] }) => {
      state.modules = modules;
    },

    /**
     * Creates a new module, using an auto-generated UUID instead of a DB-generated id
     */
    addModule: (state, { payload: moduleData }: { payload: { name: string; course: string } }) => {
      const newModule: Module = {
        _id: uuidv4(),
        lessons: [],
        name: moduleData.name,
        course: moduleData.course,
      };
      state.modules = [...state.modules, newModule];
    },

    /**
     * Removes a module by its _id
     */
    deleteModule: (state, { payload: moduleId }: { payload: string }) => {
      state.modules = state.modules.filter((m: Module) => m._id !== moduleId);
    },

    /**
     * Updates an existing module with new data
     */
    updateModule: (state, { payload: updatedModule }: { payload: Module }) => {
      state.modules = state.modules.map((m: Module) =>
        m._id === updatedModule._id ? updatedModule : m
      );
    },

    /**
     * Flags a module as currently "editing" by toggling an `editing` property
     */
    editModule: (state, { payload: moduleId }: { payload: string }) => {
      state.modules = state.modules.map((m: Module) =>
        m._id === moduleId ? { ...m, editing: true } : m
      );
    },
  },
});

export const { setModules, addModule, deleteModule, updateModule, editModule } =
  modulesSlice.actions;

export default modulesSlice.reducer;
