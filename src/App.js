// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { StudentContext, studentStore } from "./0101/StudentStore";
import TodoPage from "./todo/TodoPage";
import ExamPage from "./todo/ExamPage";
import CompletedPage from "./todo/CompletedPage";

function App() {
  return (
    <StudentContext.Provider value={studentStore}>
      <Router>
        <Routes>
          <Route path="/todo" element={<TodoPage />} />
          <Route path="/exam/:examId" element={<ExamPage />} />
          <Route path="/completed" element={<CompletedPage />} />
        </Routes>
      </Router>
    </StudentContext.Provider>
  );
}

export default App;
