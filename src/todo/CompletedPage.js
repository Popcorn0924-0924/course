import React, { useContext } from "react";
import { observer } from "mobx-react";
import { StudentContext } from "../todo/StudentStore";  // 引入 StudentContext
import { Link, useNavigate } from "react-router-dom";

const CompletedPage = observer(() => {
  const studentStore = useContext(StudentContext);  // 從 context 中獲取 studentStore
  const navigate = useNavigate();  // 用來跳轉到 CompletedPage
  
  const handleGoToCompleted = () => {
    console.log("Directly going to todo page.");
    navigate("/todo"); // 跳轉到 Completed 頁面
  };
  return (
    <div>
      <h1>Completed Exams</h1>
      {studentStore.fetchCompletedExams().length === 0 ? (  // 使用 fetchCompletedExams()
        <div>No completed exams yet.</div>
      ) : (
        studentStore.fetchCompletedExams().map((exam) => (
          <div key={exam.id}>
            <p>{exam.name}</p>
          </div>
        ))
      )}
      <button onClick={handleGoToCompleted}>
        Go to Completed (No Changes)
      </button>
    </div>
  );
});

export default CompletedPage;
