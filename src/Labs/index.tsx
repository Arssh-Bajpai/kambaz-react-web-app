import Lab1 from "./Lab1";
import { Route, Routes, Navigate } from "react-router-dom";
import TOC from "./TOC/TOC";
import Lab2 from "./Lab2";

export default function Labs() {
  return (
    <div>
      <h1>Labs</h1>
      <TOC />
      <Routes>
        {/* Default Route - Redirects to Lab1 */}
        <Route path="/" element={<Navigate to="Lab1" replace />} />

        {/* Lab Routes */}
        <Route path="Lab1" element={<Lab1 />} />
        <Route path="Lab2/*" element={<Lab2 />} />
      </Routes>
    </div>
  );
}
