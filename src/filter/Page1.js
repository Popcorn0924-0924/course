import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { studentStore1 } from './filteredStudentstore'; // 引入不同的 store

let renderCount1 = 0; // 計算 Page1 渲染次數

const Page1 = observer(() => {
  const [filter, setFilter] = useState({ min: 0, max: 100 });
  studentStore1.score=[
    { name: 'David', score: 60 },
    { name: 'Eva', score: 90 },
    { name: 'Frank', score: 40 },
  ]
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilter((prev) => ({
      ...prev,
      [name]: Number(value),
    }));
  };

  useEffect(() => {
    studentStore1.setFilter(filter);
  }, [filter]);

  renderCount1 += 1; // 計算渲染次數

  return (
    <div>
      <h2>頁面 1 - 學生篩選</h2>
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

      <h3>篩選結果:</h3>
      <ul>
        {studentStore1.filteredStudents.map((student) => (
          <li key={student.name}>
            {student.name}: {student.score}
          </li>
        ))}
      </ul>

      <h3>平均分數: {studentStore1.averageScore}</h3>
    </div>
  );
});

export default Page1;
