import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MemberPage from "./MemberPage";
import LeaderDashboard from "./LeaderDashboard";
import ExamPage from "./ExamPage";

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/member" element={<MemberPage />} />
        <Route path="/leader" element={<LeaderDashboard />} />
        <Route path="/exam/:id" element={<ExamPage />} />
      </Routes>
    </Router>
  );
};

export default App;
