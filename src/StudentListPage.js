import React from "react";
import { observer } from "mobx-react-lite";
import { useNavigate } from "react-router-dom";
import examStore from "./store/examStore";

const StudentListPage = observer(() => {
  const navigate = useNavigate();
  const { students, average, chartData } = examStore;

  return (
    <div>
      <h2>平均分數: {average}</h2>
      {/* 假設 Chart 是個現成的圖表元件 */}
      <div>
        <p>正確數: {chartData.correct}</p>
        <p>錯誤數: {chartData.incorrect}</p>
      </div>
      <table>
        {students.map((student) => (
          <tr key={student.id}>
            <td>{student.name}</td>
            <td>{student.score}</td>
            <td>
              <button
                onClick={() => {
                  examStore.fetchStudentDetails(student.id);
                  navigate(`/student-details`);
                }}
              >
                詳情
              </button>
            </td>
          </tr>
        ))}
      </table>
    </div>
  );
});

export default StudentListPage;
