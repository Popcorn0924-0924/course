import React from "react";
import { observer } from "mobx-react-lite";
import examStore from "./store/examStore";

const StudentDetailsPage = observer(() => {
  const { studentDetails } = examStore;

  return (
    <div>
      <h2>學生詳情</h2>
      {studentDetails ? (
        <div>
          <p>答題狀況: {studentDetails.answerStatus}</p>
          <p>得分: {studentDetails.score}</p>
        </div>
      ) : (
        <p>沒有選擇學生</p>
      )}
    </div>
  );
});

export default StudentDetailsPage;
