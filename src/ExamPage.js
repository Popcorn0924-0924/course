import React from "react";
import { useNavigate } from "react-router-dom";
import examStore from "./store/examStore";

function ExamPage() {
  const navigate = useNavigate();

  const selectExam = (examId) => {
    examStore.setExamId(examId);
    navigate("/students");
  };

  return (
    <div>
      <button onClick={() => selectExam("java")}>Java</button>
      <button onClick={() => selectExam("python")}>Python</button>
    </div>
  );
}

export default ExamPage;
