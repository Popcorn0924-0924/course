import React, { useEffect, useContext, useState } from "react";
import { observer } from "mobx-react";
import { StudentContext } from "../todo/StudentStore";  // 引入 StudentContext
import { Link, useNavigate } from "react-router-dom";

const TodoPage = observer(() => {
  const studentStore = useContext(StudentContext);  // 從 context 中獲取 studentStore
  const navigate = useNavigate();  // 用來跳轉到 CompletedPage
  const [isDataFetched, setIsDataFetched] = useState(false);  // 用來追蹤資料是否已經抓取

  useEffect(() => {
    if (!isDataFetched) {
      const todoExams = studentStore.fetchTodoExams();  // 使用 fetchTodoExams 獲取待處理的考試
      console.log("Todo Exams:", todoExams);
      setIsDataFetched(true); // 設置為已抓取資料
    } else {
      console.log("Data already fetched, skipping API call.");
    }
  }, [studentStore, isDataFetched]);

  const handleGoToCompleted = () => {
    console.log("Directly going to Completed page.");
    navigate("/completed"); // 跳轉到 Completed 頁面
  };

  return (
    <div>
      <h1>Todo Exams</h1>
      {studentStore.fetchTodoExams().length === 0 ? (
        <div>No exams available.</div>
      ) : (
        studentStore.fetchTodoExams().map((exam) => (
          <div key={exam.id}>
            <p>{exam.name}</p>
            <Link to={`/exam/${exam.id}`}>Start Exam</Link>
          </div>
        ))
      )}
      <button onClick={handleGoToCompleted}>
        Go to Completed (No Changes)
      </button>
    </div>
  );
});

export default TodoPage;
