import React, { useEffect, useState } from 'react';
import { observer } from 'mobx-react-lite';
import { studentStore2 } from './filteredStudentstore'; // 引入不同的 store


const Page2 = observer(() => {
  const [filter, setFilter] = useState({ min: 0, max: 100 });
  studentStore2.students=[
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
    studentStore2.setFilter(filter);
  }, [filter]);


  return (
    <div>
      <h2>頁面 2 - 學生篩選</h2>
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
        {studentStore2.filteredStudents.map((student) => (
          <li key={student.name}>
            {student.name}: {student.score}
          </li>
        ))}
      </ul>

      <h3>平均分數: {studentStore2.averageScore}</h3>
    </div>
  );
});

export default Page2;
