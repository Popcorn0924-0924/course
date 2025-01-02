import React, { useEffect, useContext } from "react";
import { observer } from "mobx-react-lite";
import { studentStore, StudentContext } from "./StudentStore";
import { useNavigate } from "react-router-dom";

const MemberPage = observer(() => {
  const pageName = "MemberPage"; // 每個頁面有自己唯一的名稱
  const navigate = useNavigate();
  const store = useContext(StudentContext); // 使用context來獲取store

  // 當頁面加載時模擬 API 請求
  useEffect(() => {
    store.fetchStudents(); // 獲取學生資料
  }, [store]);

  const handleFilterChange = (e) => {
    store.setFilter(pageName, Number(e.target.value)); // 設定篩選條件
  };

  const handleSelectStudent = (studentId) => {
    navigate(`/student/${studentId}`);
  };

  return (
    <div>
      <h1>Member Page</h1>
      <div>
        <label>Filter by Score (below):</label>
        <input
          type="number"
          value={store.filters[pageName] || 60}
          onChange={handleFilterChange}
        />
      </div>
      <h2>Students List</h2>
      <ul>
        {store.getFilteredStudents(pageName).map((student) => (
          <li key={student.id}>
            <p>{student.name}</p>
            <p>Score: {student.score}</p>
            <button onClick={() => handleSelectStudent(student.id)}>
              View Details
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
});

export default MemberPage;
