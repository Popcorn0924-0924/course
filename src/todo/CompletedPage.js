// todo/CompletedPage.js
import React, { useContext } from "react";
import { observer } from "mobx-react";
import { StudentContext } from "../0101/StudentStore";  // 引入 StudentContext

const CompletedPage = observer(() => {
  const studentStore = useContext(StudentContext);  // 從 context 中獲取 studentStore

  return (
    <div>
      <h1>Completed Exams</h1>
      {studentStore.completedExams.length === 0 ? (
        <div>No completed exams yet.</div>
      ) : (
        studentStore.completedExams.map((exam) => (
          <div key={exam.id}>
            <p>{exam.name}</p>
          </div>
        ))
      )}
    </div>
  );
});

export default CompletedPage;
