// todo/ExamPage.js
import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import { useParams, useNavigate } from "react-router-dom";
import { StudentContext } from "../0101/StudentStore";

const ExamPage = observer(() => {
  const { examId } = useParams();
  const studentStore = useContext(StudentContext);
  const navigate = useNavigate();
  const [examAnswered, setExamAnswered] = useState(false);

  useEffect(() => {
    const exam = studentStore.todoExams.find((exam) => exam.id === parseInt(examId));
    studentStore.setCurrentExam(exam);
    console.log("Exam started:", exam);
  }, [examId, studentStore]);

  const handleSubmit = () => {
    studentStore.updateExamStatus(parseInt(examId), "completed");
    setExamAnswered(true);
    navigate("/completed");
  };

  return (
    <div>
      <h1>{studentStore.currentExam?.name}</h1>
      <p>Write your answers...</p>
      <button onClick={handleSubmit} disabled={examAnswered}>
        Submit Exam
      </button>
    </div>
  );
});

export default ExamPage;