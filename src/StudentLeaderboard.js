// StudentLeaderboard.js
import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import studentStore from './FilteredStudentStore';

const StudentLeaderboard = observer(() => {
  const [filter, setFilter] = useState({ min: 0, max: 100 });

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    studentStore.setFilter(filter);
  }, [filter]);

  return (
    <div>
      <h2>學生排行榜</h2>
      <label>
        最小分數:
        <input
          type="number"
          name="min"
          value={filter.min}
          onChange={handleFilterChange}
        />
      </label>
      <label>
        最大分數:
        <input
          type="number"
          name="max"
          value={filter.max}
          onChange={handleFilterChange}
        />
      </label>

      <h3>篩選後的學生:</h3>
      <ul>
        {studentStore.sortedStudents.map((student) => (
          <li key={student.name}>
            {student.name}: {student.score}
          </li>
        ))}
      </ul>

      <h3>最高分學生:</h3>
      {studentStore.topStudent ? (
        <p>
          {studentStore.topStudent.name}: {studentStore.topStudent.score}
        </p>
      ) : (
        <p>無學生符合篩選條件</p>
      )}
    </div>
  );
});

export default StudentLeaderboard;
