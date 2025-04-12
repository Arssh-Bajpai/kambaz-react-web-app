// src/Kambaz/Account/modules-client.js (or .ts if using TypeScript)
import axios from "axios";

// Access your environment variable from Vite
const REMOTE_SERVER = import.meta.env.VITE_REMOTE_SERVER;
const MODULES_API = `${REMOTE_SERVER}/api/modules`;

// Remove the TypeScript parameter type annotation if you're using plain JS
export const updateModule = async (module) => {
  const { data } = await axios.put(`${MODULES_API}/${module._id}`, module);
  return data;
};

export const deleteModule = async (moduleId) => {
  const response = await axios.delete(`${MODULES_API}/${moduleId}`);
  return response.data;
};
