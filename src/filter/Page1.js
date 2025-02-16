import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { studentStore1 } from './filteredStudentstore'; // 引入不同的 store

const Page1 = observer(() => {
  const [filter, setFilter] = useState({ min: 0, max: 100 });
  studentStore1.students=[
    { name: 'David', score: 70 },
    { name: 'Eva', score: 80 },
    { name: 'Frank', score: 50 },
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
